# n8n Workflow Design: Automated Intelligence Feed

## 1. Overview
本ドキュメントは、Sonar Pro API (Perplexity) と LLM を活用し、Resilience Hub の「External Intel Feed」に掲載する記事を自動生成・構造化するための n8n ワークフロー設計図である。

### Core Concept
*   **Search**: Sonar Pro で最新のリスク情報を広範囲に収集（一次情報の確保）。
*   **Structure**: LLM で情報を「BizOps視点」で解釈・構造化（インテリジェンス化）。
*   **Store**: MicroCMS に構造化データとして入稿（ヘッドレス配信）。

---

## 2. Architecture (Mermaid)

```mermaid
graph TD
    Trigger[Schedule Trigger<br/>(Every 6 Hours)] --> Search[HTTP Request<br/>Sonar Pro API<br/>(Search News)]
    Search --> Split[Split In Batches]
    Split --> LLM[AI Agent / LLM Chain<br/>(Structure & Analyze)]
    LLM --> Format[JSON Parser<br/>(Validate Schema)]
    Format --> CMS[HTTP Request<br/>MicroCMS API<br/>(Create Draft)]
    CMS --> Notify[Slack Notification<br/>(Review Request)]
```

---

## 3. MicroCMS Schema Definition

フロントエンド（`IntelPage.tsx`）の表示要件を満たすためのコンテンツスキーマ。

| Field ID | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | Text | Yes | 記事タイトル（日本語、体言止め推奨） |
| `source` | Text | Yes | 情報源（例: Reuters, WEF, CyberNews） |
| `publishedAt` | Date | Yes | 記事の公開日時 |
| `summary` | TextArea | Yes | 概要（100文字以内） |
| `url` | Text | Yes | 一次情報のURL |
| `tags` | Select (Multi) | Yes | `Region` (Japan, Global, etc.) |
| `risk_type` | Select (Multi) | Yes | `Risk Type` (Supply Chain, Cyber, etc.) |
| `ai_analysis` | TextArea | Yes | BizOps視点での示唆（200文字以内） |
| `importance` | Number | Yes | 重要度スコア (1-5) |
| `body` | RichEditor | No | 詳細本文（必要に応じて） |

---

## 4. System Prompt for LLM Node

Sonar Pro から得られた検索結果（テキスト）を入力とし、MicroCMS 用の JSON を出力するためのプロンプト。

```markdown
# Role
あなたは「The Global Resilience Hub」の専属インテリジェンス・アナリストです。
BizOps、サプライチェーン、地政学リスクの専門家として、企業の意思決定を支援します。

# Task
入力されたニュース記事情報を分析し、以下のJSONスキーマに厳密に従って構造化データを出力してください。

# Input Data
{{ $json.content }} 
(Source URL: {{ $json.url }})

# Output Schema (JSON Only)
{
  "title": "記事のタイトル（日本語訳・30文字以内・体言止め）",
  "source": "情報源の組織名（英語表記推奨）",
  "summary": "記事の要約（100文字以内。結論を優先し、冗長な表現を避ける）",
  "tags": ["Regionタグを選択"], 
  "risk_type": ["RiskTypeタグを選択"],
  "ai_analysis": "BizOps/事業継続性の観点からの示唆（200文字以内）。「だから何をするべきか」という具体的なアクションを含めること。",
  "importance": 1-5の整数 (5: 即時対応が必要, 1: 情報収集レベル)
}

# Tagging Rules
## Region
- Japan, Asia, North America, Europe, Global

## Risk Type
- Supply Chain: 物流、調達、生産停止など
- Cyber Security: ランサムウェア、情報漏洩、システム障害
- Climate Change: 自然災害、環境規制、脱炭素
- Geopolitics: 戦争、貿易摩擦、経済制裁
- Regulation: 法改正、コンプライアンス
- Technology: AI、新技術、イノベーション

# Constraints
- 出力は **JSONオブジェクトのみ** を含むこと。Markdownのコードブロック（```json ... ```）は不要。
- 言語はすべて「日本語」で出力すること（source名は英語のままで可）。
- `ai_analysis` は、単なる要約ではなく「企業の担当者が次に何を検討すべきか」という提言を行うこと。
- 入力情報が不十分で分析不能な場合は、空のJSON `{}` を返すこと。
```

---

## 5. Implementation Steps

1.  **Sonar Pro API Setup**:
    *   Endpoint: `https://api.perplexity.ai/chat/completions`
    *   Model: `sonar-pro`
    *   Query Example: `"latest supply chain disruption news global 24h"`

2.  **n8n Configuration**:
    *   **HTTP Request (Search)**: Sonar Pro を呼び出し、最新ニュースを5件取得。
    *   **Code Node**: レスポンスを個別のアイテムに分割。
    *   **AI Agent / LLM**: 上記プロンプトを使用し、各記事を構造化。
    *   **HTTP Request (CMS)**: MicroCMS の `POST /api/v1/intel` エンドポイントへ JSON を送信。

3.  **Error Handling**:
    *   JSON パースエラー時は、Slack に生ログを通知して手動修正を促す。
    *   重複記事（URLの一致）は MicroCMS 側または n8n の Deduplication ノードで除外。
