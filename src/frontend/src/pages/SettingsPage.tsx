import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function SettingsPage() {
  const { principalText } = useAuth();

  return (
    <div className="max-w-2xl space-y-6" data-ocid="settings.page">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account preferences.
        </p>
      </div>

      {/* Identity */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User size={16} className="text-primary" />
            <CardTitle className="text-base">Identity</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">
              Principal ID
            </Label>
            <p
              className="font-mono text-sm text-foreground mt-1 break-all"
              data-ocid="settings.principal.display"
            >
              {principalText ?? "—"}
            </p>
          </div>
          <Separator />
          <div>
            <Label className="text-xs text-muted-foreground">
              Authentication Method
            </Label>
            <p className="text-sm text-foreground mt-1">Internet Identity</p>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-primary" />
            <CardTitle className="text-base">Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">
                Biometric Authentication
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Use device biometrics when supported
              </p>
            </div>
            <Switch
              disabled
              data-ocid="settings.biometric.switch"
              aria-label="Biometric authentication"
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Session Timeout</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Auto-logout after 30 minutes of inactivity
              </p>
            </div>
            <Switch
              defaultChecked
              data-ocid="settings.timeout.switch"
              aria-label="Session timeout"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-primary" />
            <CardTitle className="text-base">Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Transaction Alerts</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Show toast notifications on deposits and withdrawals
              </p>
            </div>
            <Switch
              defaultChecked
              data-ocid="settings.tx_alerts.switch"
              aria-label="Transaction alerts"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
