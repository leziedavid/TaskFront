declare module 'react-quill' {
    import { Component } from 'react';

    export interface QuillEditorProps {
        value: string;
        onChange: (value: string) => void;
        theme?: string;
        modules?: any;
        formats?: string[];
        placeholder?: string;
    }

    export default class ReactQuill extends Component<QuillEditorProps> {
        [x: string]: any;
}
}
