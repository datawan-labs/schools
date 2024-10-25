import { EditorView, basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { sql, StandardSQL } from "@codemirror/lang-sql";
import { createEffect, onCleanup, onMount } from "solid-js";

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const CodeEditor = (props: CodeEditorProps) => {
  let parent: HTMLDivElement;

  let view: EditorView;

  onMount(() => {
    view = new EditorView({
      doc: props.value,
      parent: parent,
      extensions: [
        EditorView.lineWrapping,
        oneDark,
        basicSetup,
        sql({
          dialect: StandardSQL,
          upperCaseKeywords: true,
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged)
            props.onChange && props.onChange(update.state.doc.toString());
        }),
      ],
    });
  });

  createEffect(() => {
    if (!view) return;

    const currentValue = view.state.doc.toString();

    if (props.value !== currentValue)
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: props.value },
      });
  });

  onCleanup(() => view.destroy());

  return (
    <div
      class="[&>*>*]:!font-mono relative flex h-full min-h-32 w-full border font-mono text-sm [&>*]:w-full"
      ref={parent!}
    />
  );
};
