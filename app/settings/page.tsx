import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";

export default function Page() {
    return (
        <WorkspaceLayout title="Settings" description="Configure the SupportHub experience" compact={false}>
            <SettingsPageShell />
        </WorkspaceLayout>
    );
}
