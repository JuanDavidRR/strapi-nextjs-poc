import { ParagraphProps } from "@/app/types";
import ReactMarkdown from "react-markdown";

export function Paragraph({ content }: Readonly<ParagraphProps>) {
  return (
    <div className="prose-custom space-y-6 mt-10 max-w-7xl mx-auto px-5">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
