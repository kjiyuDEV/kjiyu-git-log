import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import Base64UploaderPlugin from '../../@ckeditor/Base64Uploads';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { TYPE } from '../../redux/types';
import PostingHeader from './PostingHeader';

const Posting = () => {
    const dispatch = useDispatch();
    const editorConfiguration = {
        extraPlugins: [Base64UploaderPlugin],
        toolbar: [
            'fontSize',
            'alignment',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'code',
            '|',
            'fontColor',
            'fontBackgroundColor',
            'imageUpload',
            '|',
            'link',
            '|',
            'undo',
            'redo',
        ],

        heading: {
            options: [
                { model: 'paragraph', view: 'p', title: '본문', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: '헤더1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: '헤더2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: '헤더3', class: 'ck-heading_heading3' },
            ],
        },

        fontSize: {
            options: [10, 11, 12, 13, 14, 15, 16, 17, 18],
        },

        alignment: {
            options: ['justify', 'left', 'center', 'right'],
        },

        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },

        image: {
            resizeUnit: 'px',
            toolbar: ['imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight', '|', 'imageTextAlternative'],
            styles: ['full', 'alignLeft', 'alignRight'],
        },

        typing: {
            transformations: {
                remove: ['enDash', 'emDash', 'oneHalf', 'oneThird', 'twoThirds', 'oneForth', 'threeQuarters'],
            },
        },
        language: 'ko',
        placeholder: '내용을 입력하세요',
    };

    const [form, setForm] = useState({
        title: null,
        contents: null,
        previewContents: null,
        category: '일상',
        fileUrl: '',
    });

    const onSubmit = async (e) => {
        await e.preventDefault();
        console.log(Object.keys(form).find((v) => form[v] === null));
        if (Object.keys(form).find((v) => form[v] === null)) {
            dispatch({
                type: TYPE.OPEN_CONFIRM_MODAL,
                data: {
                    type: 'submitResult',
                    title: '빈 값이 존재합니다.<br/>제목 및 본문내용은<br/>필수입력값입니다.',
                    txtConfirm: '확인했습니다',
                    handleConfirm: () => {
                        dispatch({
                            type: TYPE.CLOSE_CONFIRM_MODAL,
                        });
                    },
                    handleCancel: null,
                },
            });
            return false;
        }
        const data = form.contents;
        let { title, contents, fileUrl, category, previewContents } = form;
        const token = localStorage.getItem('token');

        // imgurl //
        if (data && data.match('<img src=')) {
            const whereImg_start = data.indexOf('<img src=');
            console.log(whereImg_start);
            let whereImg_end = '';
            let ext_name_find = '';
            let result_Img_Url = '';

            const ext_name = ['jpeg', 'png', 'jpg', 'gif'];

            for (let i = 0; i < ext_name.length; i++) {
                if (data.match(ext_name[i])) {
                    console.log(data.indexOf(`${ext_name[i]}`));
                    ext_name_find = ext_name[i];
                    whereImg_end = data.indexOf(`${ext_name[i]}`);
                }
            }
            console.log(ext_name_find);
            console.log(whereImg_end);

            if (ext_name_find === 'jpeg') {
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
            } else {
                result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
            }

            console.log(result_Img_Url, 'result_Img_Url');
            fileUrl = result_Img_Url;
        } else {
            fileUrl = process.env.REACT_APP_BASIC_SERVER_URL;
        }

        const body = { title, contents, fileUrl, category, token, previewContents };

        dispatch({
            type: TYPE.POST_UPLOADING_REQUEST,
            payload: body,
        });
    };

    // Myinit();

    const handleChange = (event, editor) => {
        const data = editor.getData();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        const previewContents = tempDiv.textContent || tempDiv.innerText || '';
        setForm({
            ...form,
            contents: data,
            previewContents: previewContents.substr(0, 100),
        });
    };

    console.log(form);

    return (
        <div className="posting-wrap">
            <PostingHeader onSubmit={onSubmit} />
            <div className="title-wrap">
                <input
                    placeholder="제목"
                    onChange={(e) => {
                        setForm({ ...form, title: e.target.value });
                    }}
                />
            </div>
            <CKEditor
                editor={Editor}
                onChange={(event, editor) => {
                    handleChange(event, editor);
                    // const data = editor.getData();
                    // console.log({ event, editor, data });
                }}
                onInit={(editor) => {
                    // 특정 플러그인을 제거하려면 플러그인을 포함하는 모듈 자체를 비활성화합니다.
                    // editor.plugins.get(ImageCaption).disable();
                    // 필요하면 다른 설정을 추가할 수 있습니다.
                }}
                config={editorConfiguration}
                data=""
            />
            <div className="category-wrap">
                <p>카테고리</p>
                <select>
                    <option>일상</option>
                </select>
            </div>
        </div>
    );
};

export default withRouter(Posting);
