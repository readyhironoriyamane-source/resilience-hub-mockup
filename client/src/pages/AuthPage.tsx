import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, ArrowRight, Mail, Lock, Building2, User, CheckCircle2, Search } from "lucide-react";
import { toast } from "sonner";
import { MOCK_ORGANIZATIONS, ROLES, Organization } from "@/data/organizations";

export default function AuthPage() {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  // Register Form State
  const [registerStep, setRegisterStep] = useState<1 | 2>(1);
  const [registerOrgQuery, setRegisterOrgQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerRole, setRegisterRole] = useState("");

  // Organization Suggestion Logic
  const filteredOrgs = useMemo(() => {
    if (!registerOrgQuery) return [];
    return MOCK_ORGANIZATIONS.filter(org => 
      org.name.includes(registerOrgQuery)
    ).slice(0, 5);
  }, [registerOrgQuery]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      toast.success("ログインしました", {
        description: "おかえりなさいませ。救世主たらんことを。"
      });
      setLocation("/");
    } else {
      toast.error("入力内容をご確認ください");
    }
  };

  const handleRegisterStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOrg || registerOrgQuery) {
      setRegisterStep(2);
    } else {
      toast.error("所属組織を入力または選択してください");
    }
  };

  const handleRegisterFinal = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerName && registerEmail && registerRole) {
      toast.success("登録が完了しました", {
        description: "Resilience Hubへようこそ。共に備えましょう。"
      });
      setLocation("/");
    } else {
      toast.error("全ての項目を入力してください");
    }
  };

  const selectOrg = (org: Organization) => {
    setSelectedOrg(org);
    setRegisterOrgQuery(org.name);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0e17] p-4 md:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* Left Column: Login */}
        <div className={`transition-all duration-500 ${activeTab === 'register' && 'hidden lg:block lg:opacity-50'}`}>
          <Card className="h-full border-white/10 bg-card/40 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-4 pb-8">
              <div className="flex items-center gap-2 text-primary mb-2">
                <ShieldCheck className="w-8 h-8" />
                <span className="text-xl font-bold tracking-tight">Resilience Hub</span>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">
                いつものIDで、<br />備えを再開する
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                日々の業務の延長線上に、確かな安心を。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="pl-10 bg-white/5 border-white/10 h-12"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">パスワード</Label>
                    <a href="#" className="text-sm text-primary hover:underline">パスワードをお忘れですか？</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      className="pl-10 bg-white/5 border-white/10 h-12"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox 
                    id="keep-logged-in" 
                    checked={keepLoggedIn}
                    onCheckedChange={(checked) => setKeepLoggedIn(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="keep-logged-in" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      ログイン状態を保持する
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      ※共有PCではチェックを外してください
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 mt-4">
                  ログインしてダッシュボードへ
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10 lg:hidden">
                <p className="text-center text-muted-foreground mb-4">アカウントをお持ちでない方は</p>
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-primary/50 text-primary hover:bg-primary/10"
                  onClick={() => setActiveTab("register")}
                >
                  新規登録はこちら
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Register */}
        <div className={`transition-all duration-500 ${activeTab === 'login' && 'hidden lg:block'}`}>
          <Card className="h-full border-primary/30 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
            
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-between items-start">
                <div className="w-fit px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30 mb-2">
                  登録は無料です
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div className={`flex items-center gap-1 ${registerStep === 1 ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${registerStep === 1 ? "border-primary bg-primary/20" : "border-white/10 bg-white/5"}`}>1</div>
                    <span>組織選択</span>
                  </div>
                  <div className="w-8 h-[1px] bg-white/10" />
                  <div className={`flex items-center gap-1 ${registerStep === 2 ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${registerStep === 2 ? "border-primary bg-primary/20" : "border-white/10 bg-white/5"}`}>2</div>
                    <span>詳細入力</span>
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">
                1分で完了。<br />地域の守り方を、ここから。
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {registerStep === 1 
                  ? "まずは所属組織を選択してください。入力の手間を省きます。" 
                  : "あと少しです。あなたの役割を教えてください。"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {registerStep === 1 ? (
                <form onSubmit={handleRegisterStep1} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="reg-org">組織・自治体名</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="reg-org" 
                        placeholder="例：世田谷区、トヨタ自動車..." 
                        className="pl-10 bg-white/5 border-white/10 h-12"
                        value={registerOrgQuery}
                        onChange={(e) => {
                          setRegisterOrgQuery(e.target.value);
                          if (selectedOrg && e.target.value !== selectedOrg.name) {
                            setSelectedOrg(null);
                          }
                        }}
                        autoFocus
                      />
                    </div>
                    
                    {/* Suggestion List */}
                    {registerOrgQuery && !selectedOrg && filteredOrgs.length > 0 && (
                      <div className="absolute z-50 w-[calc(100%-3rem)] mt-1 bg-[#1a1f2e] border border-white/10 rounded-md shadow-xl overflow-hidden">
                        {filteredOrgs.map((org) => (
                          <div 
                            key={org.id}
                            className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors"
                            onClick={() => selectOrg(org)}
                          >
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="font-medium">{org.name}</div>
                              <div className="text-xs text-muted-foreground">{org.domain || "ドメイン情報なし"}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedOrg && (
                      <div className="mt-2 p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          {selectedOrg.name} が選択されています
                        </span>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground pl-1">
                      候補にない場合は、そのまま入力して次へお進みください
                    </p>
                  </div>

                  <Button type="submit" className="w-full h-12 text-base font-bold bg-white text-black hover:bg-white/90 mt-4 group">
                    次へ進む
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleRegisterFinal} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-name">氏名</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="reg-name" 
                          placeholder="例：防災 太郎" 
                          className="pl-10 bg-white/5 border-white/10 h-12"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-email">メールアドレス</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="reg-email" 
                          type="email" 
                          placeholder={selectedOrg?.domain ? `name@${selectedOrg.domain}` : "name@example.com"}
                          className="pl-10 bg-white/5 border-white/10 h-12"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                      </div>
                      {selectedOrg?.domain && (
                        <p className="text-xs text-primary/80 pl-1">
                          ※ {selectedOrg.name} のドメイン ({selectedOrg.domain}) を推奨します
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-role">役職・役割</Label>
                      <Select onValueChange={setRegisterRole} value={registerRole}>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10">
                          <SelectValue placeholder="役割を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="h-12 px-6"
                      onClick={() => setRegisterStep(1)}
                    >
                      戻る
                    </Button>
                    <Button type="submit" className="flex-1 h-12 text-base font-bold bg-white text-black hover:bg-white/90">
                      登録を完了する
                    </Button>
                  </div>
                </form>
              )}

              <div className="mt-8 pt-6 border-t border-white/10 lg:hidden">
                <p className="text-center text-muted-foreground mb-4">すでにアカウントをお持ちの方は</p>
                <Button 
                  variant="ghost" 
                  className="w-full h-12 text-muted-foreground hover:text-white"
                  onClick={() => setActiveTab("login")}
                >
                  ログイン画面へ戻る
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
