import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig
} from "@wangeditor/editor";

interface RichTextEditorProps {
  content: string; // 添加一个 content 属性来传递初始内容
  onModifyTextContent: (content: string) => void; // 回调函数用于传递编辑器内容到父页面
}

const App = ({ content, onModifyTextContent }: RichTextEditorProps) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState(content);
  useEffect(() => {
    setHtml(content); // 使用 content 设置初始内容
  }, [content]);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: "请输入内容..."
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    if (editor == null) return;
    return () => {
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor: any) => {
            setHtml(editor.getHtml());
            onModifyTextContent(editor.getHtml());
          }}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
};

export default App;
