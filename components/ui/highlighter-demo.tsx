import { Highlighter } from "@/components/ui/highlighter";

export function HighlighterDemo() {
  return (
    <div className="text-center py-10">
      <p className="text-xl leading-relaxed">
        The{" "}
        <Highlighter action="underline" color="#FF9800" isView>
          Magic UI Highlighter
        </Highlighter>{" "}
        makes important{" "}
        <Highlighter action="highlight" color="#87CEFA" isView>
          text stand out
        </Highlighter>{" "}
        effortlessly.
      </p>
    </div>
  );
}
