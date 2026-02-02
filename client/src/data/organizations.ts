export interface Organization {
  id: string;
  name: string;
  type: 'municipality' | 'corporation' | 'other';
  domain?: string;
  logo?: string; // In a real app, this would be a URL
}

export const MOCK_ORGANIZATIONS: Organization[] = [
  // Municipalities
  { id: 'org_001', name: '世田谷区', type: 'municipality', domain: 'city.setagaya.tokyo.jp' },
  { id: 'org_002', name: '港区', type: 'municipality', domain: 'city.minato.tokyo.jp' },
  { id: 'org_003', name: '渋谷区', type: 'municipality', domain: 'city.shibuya.tokyo.jp' },
  { id: 'org_004', name: '横浜市', type: 'municipality', domain: 'city.yokohama.lg.jp' },
  { id: 'org_005', name: '大阪市', type: 'municipality', domain: 'city.osaka.lg.jp' },
  { id: 'org_006', name: '福岡市', type: 'municipality', domain: 'city.fukuoka.lg.jp' },
  { id: 'org_007', name: '札幌市', type: 'municipality', domain: 'city.sapporo.jp' },
  { id: 'org_008', name: '神戸市', type: 'municipality', domain: 'city.kobe.lg.jp' },
  { id: 'org_009', name: '京都市', type: 'municipality', domain: 'city.kyoto.lg.jp' },
  { id: 'org_010', name: '名古屋市', type: 'municipality', domain: 'city.nagoya.jp' },

  // Corporations
  { id: 'corp_001', name: 'トヨタ自動車株式会社', type: 'corporation', domain: 'toyota.co.jp' },
  { id: 'corp_002', name: 'ソニーグループ株式会社', type: 'corporation', domain: 'sony.com' },
  { id: 'corp_003', name: '株式会社日立製作所', type: 'corporation', domain: 'hitachi.co.jp' },
  { id: 'corp_004', name: 'ソフトバンク株式会社', type: 'corporation', domain: 'softbank.jp' },
  { id: 'corp_005', name: '株式会社NTTドコモ', type: 'corporation', domain: 'nttdocomo.co.jp' },
  { id: 'corp_006', name: '楽天グループ株式会社', type: 'corporation', domain: 'rakuten.co.jp' },
  { id: 'corp_007', name: '三菱商事株式会社', type: 'corporation', domain: 'mitsubishicorp.com' },
  { id: 'corp_008', name: '伊藤忠商事株式会社', type: 'corporation', domain: 'itochu.co.jp' },
  { id: 'corp_009', name: '本田技研工業株式会社', type: 'corporation', domain: 'honda.co.jp' },
  { id: 'corp_010', name: '株式会社ファーストリテイリング', type: 'corporation', domain: 'fastretailing.com' },
  
  // Tech/Startups (for variety)
  { id: 'tech_001', name: '株式会社メルカリ', type: 'corporation', domain: 'mercari.com' },
  { id: 'tech_002', name: 'LINEヤフー株式会社', type: 'corporation', domain: 'lycorp.co.jp' },
  { id: 'tech_003', name: '株式会社サイバーエージェント', type: 'corporation', domain: 'cyberagent.co.jp' },
];

export const ROLES = [
  "防災担当責任者",
  "総務・人事担当",
  "経営企画・事業開発",
  "システム・IT担当",
  "広報・CSR担当",
  "現場リーダー・拠点長",
  "一般社員・職員",
  "その他"
];
