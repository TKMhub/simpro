"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

type Variant = "info" | "warning" | "success" | "error";

const variantIconMap: Record<Variant, React.ReactNode> = {
  info: <Info className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
  error: <XCircle className="h-4 w-4" />,
};

const variantStyleMap: Record<Variant, "default" | "destructive"> = {
  info: "default",
  warning: "default",
  success: "default",
  error: "destructive",
};

interface UiMessageProps {
  variant?: Variant;
  title: string;
  description?: string;
}

export function UiMessage({
  variant = "info",
  title,
  description,
}: UiMessageProps) {
  return (
    <Alert variant={variantStyleMap[variant]} className="my-6">
      {variantIconMap[variant]}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
