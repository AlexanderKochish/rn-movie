import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export interface IPrivacyPolicy {
    id: number;
    icon: IconSource;
    title: string;
    content: string;
    expanded: boolean;
}
