# GCP Python Workflow Design: Robust Intelligence Pipeline

## 1. Overview
本ドキュメントは、n8n の代替案として、Google Cloud Platform (GCP) と Python を用いた堅牢な記事自動生成パイプラインの設計図である。
「再現性」と「型安全性」を重視し、Cloud Run Jobs で定期実行する構成を採用する。

### Core Concept
*   **Robustness**: Pydantic による厳密な型定義とバリデーション。
*   **Scalability**: Cloud Run Jobs によるサーバーレス実行（タイムアウト制限の緩和）。
*   **Maintainability**: Git ベースのバージョン管理と CI/CD 対応。

---

## 2. Architecture (Mermaid)

```mermaid
graph TD
    Scheduler[Cloud Scheduler<br/>(Cron: 0 */6 * * *)] -->|Trigger| Run[Cloud Run Jobs<br/>(Python Container)]
    
    subgraph "Python Application (main.py)"
        Run --> Search[Sonar Pro API<br/>(Search & Fetch)]
        Search --> Parse[Pydantic Parser]
        Parse --> LLM[OpenAI API / LangChain<br/>(Structure & Analyze)]
        LLM --> Validate[Data Validation]
    end
    
    Validate --> CMS[MicroCMS API<br/>(POST /intel)]
    Validate -->|Error| Alert[Slack Webhook<br/>(Error Notification)]
```

---

## 3. Python Project Structure

```
.
├── main.py              # エントリーポイント
├── requirements.txt     # 依存ライブラリ
├── Dockerfile           # Cloud Run用コンテナ定義
├── schemas.py           # Pydanticモデル定義
└── services/
    ├── sonar.py         # Perplexity API連携
    ├── llm.py           # OpenAI/LangChain連携
    └── cms.py           # MicroCMS連携
```

---

## 4. Code Design (Draft)

### `schemas.py` (Type Definition)

```python
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Literal

class IntelArticle(BaseModel):
    title: str = Field(..., max_length=30, description="記事タイトル（体言止め）")
    source: str = Field(..., description="情報源組織名")
    published_at: str = Field(..., description="ISO 8601形式の日時")
    summary: str = Field(..., max_length=100, description="100文字以内の要約")
    url: HttpUrl = Field(..., description="一次情報のURL")
    tags: List[Literal["Japan", "Asia", "North America", "Europe", "Global"]]
    risk_type: List[Literal["Supply Chain", "Cyber Security", "Climate Change", "Geopolitics", "Regulation", "Technology"]]
    ai_analysis: str = Field(..., max_length=200, description="BizOps視点での示唆")
    importance: int = Field(..., ge=1, le=5, description="重要度スコア(1-5)")
```

### `main.py` (Workflow Logic)

```python
import os
import logging
from services.sonar import search_news
from services.llm import structure_content
from services.cms import post_draft
from schemas import IntelArticle

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    try:
        # 1. Search News
        logger.info("Starting news search...")
        raw_results = search_news(query="supply chain disruption global", limit=5)
        
        for item in raw_results:
            # 2. Structure & Analyze (LLM)
            logger.info(f"Processing: {item['url']}")
            structured_data: IntelArticle = structure_content(item['content'])
            
            # 3. Post to MicroCMS
            post_draft(structured_data)
            logger.info(f"Successfully posted: {structured_data.title}")
            
    except Exception as e:
        logger.error(f"Workflow failed: {str(e)}")
        # Send Slack Alert here
        raise e

if __name__ == "__main__":
    main()
```

---

## 5. Deployment Steps

1.  **Containerize**:
    ```bash
    docker build -t gcr.io/[PROJECT_ID]/intel-pipeline:v1 .
    docker push gcr.io/[PROJECT_ID]/intel-pipeline:v1
    ```

2.  **Deploy Cloud Run Job**:
    ```bash
    gcloud run jobs create intel-pipeline-job \
      --image gcr.io/[PROJECT_ID]/intel-pipeline:v1 \
      --region asia-northeast1 \
      --set-env-vars PERPLEXITY_API_KEY=...,OPENAI_API_KEY=...,MICROCMS_API_KEY=...
    ```

3.  **Schedule**:
    ```bash
    gcloud scheduler jobs create http intel-pipeline-schedule \
      --schedule "0 */6 * * *" \
      --uri "https://[REGION]-run.googleapis.com/apis/run.googleapis.com/v1/namespaces/[PROJECT_ID]/jobs/intel-pipeline-job:run" \
      --http-method POST \
      --oauth-service-account-email [SERVICE_ACCOUNT_EMAIL]
    ```

---

## 6. Comparison: n8n vs GCP Python

| Feature | n8n | GCP Python |
| :--- | :--- | :--- |
| **Development Speed** | High (Visual Editor) | Medium (Coding required) |
| **Type Safety** | Low (JSON schema validation only) | **High (Pydantic static analysis)** |
| **Version Control** | JSON export (Hard to diff) | **Git (Standard workflow)** |
| **Debugging** | Visual execution history | Logs (Cloud Logging) & Local Debug |
| **Cost** | Self-hosted or Cloud Subscription | Pay-per-use (Cloud Run) |

**Recommendation**:
プロトタイプや単純な連携には **n8n** を推奨。
長期的な運用、複雑なデータ加工、厳密なエラーハンドリングが必要な場合は **GCP Python** を推奨。
