import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';




class TextEditor extends Component{
constructor(props){
  super(props)
  this.state = {
 editorState: null,
  }
}


componentDidMount(){
  const blocksFromHtml = htmlToDraft(`${this.props.data}`);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  if(this.props.data){
     return this.setState({ editorState: EditorState.createWithContent(contentState) })
  }
   this.setState({ editorState: EditorState.createEmpty() })
}

onEditorStateChange: Function = (editorState) => {
  this.setState({
    editorState
  });
  const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
   this.props.onChange(draftToHtml(rawContentState))
};



  render(){
    const { editorState } = this.state;

    return    <Editor
                  placeholder='Type product description'
                  toolbarClassName="toolbar-class"
                  editorState={editorState}
                  toolbar={{
                      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'history'],
                  }}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                  />
  }
}

export default TextEditor;
