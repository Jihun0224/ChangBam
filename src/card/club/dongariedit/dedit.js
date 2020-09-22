import React, { Component } from 'react';
import './dedit.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

class Dedit extends Component{

    editorRef = React.createRef();
    
    handleFocus = () => {
        
        console.log(this.editorRef.current.getInstance().getHtml());
      };


    render(){
        return(
            <div className="main">
                <div className="ex">
                    <p>동아리 홍보 편집기</p>
                </div>
                <form onSubmit="">
                    <div className = "kind">
                        <p>동아리 종류</p>
                        <label>중앙동아리</label>
                        <input type="checkbox" name="center"/>
                        <label>외부동아리</label>
                        <input type="checkbox" name="out"/>
                        <label>학과동아리 : </label>
                        <input type="checkbox" name="aasd"/>
                        <select name="ga">
                            <option value="aa">선택하세요</option>
                            <option value="hangle">국어국문학과</option>
                            <option value="computer">컴퓨터공학과</option>
                            <option value="machine">기계공학과</option>
                            <option value="news">신문방송학과</option>
                        </select>
                    </div>
                    <div className ="dday">
                        <pre>마감 일 입력하세요.</pre>      
                        <label>마감일 : </label>
                        <input type="date" name="date"/>
                    </div>
                    <div className="poster">
                        <label>맛보기용 포스터 : </label>
                        <input type='file' name='files' accept='image/jpeg,image/gif,image/png'/>
                    </div>
                    <div className="bb">
                        <p>홍보를 해보세요</p>
                    </div>
                    <div className = "top">
                        <label>제목 : </label>
                        <input type="text"/>
                    </div>
                    </form>
                    <div className="edit">
                        <Editor previewStyle="tab" hideModeSwitch height="400px" width ="300px"  initialEditType="wysiwyg" ref={this.editorRef} plugins={[colorSyntax]} on />
                        <button type="submit">완료</button>
                    </div>
            </div>
        )
    }
}


export default Dedit;