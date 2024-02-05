import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import Base64UploaderPlugin from '../../@ckeditor/Base64Uploads';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { TYPE } from '../../redux/types';
import PostingHeader from './PostingHeader';
import toast from 'react-hot-toast';
import moment from 'moment';

const Posting = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const { postData } = useSelector((state) => {
        console.log(state);
        return {
            postData: state.post.postDetail,
        };
    });

    const [form, setForm] = useState({
        title: postData.title || null,
        contents: postData.contents || null,
        previewContents: null,
        category: '일상',
        fileUrl: '',
    });
    console.log(postData, '<postData!');
    const editorConfiguration = {
        extraPlugins: [Base64UploaderPlugin],
        toolbar: [
            'fontSize',
            'alignment',
            '|',
            'highlight',
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
        ],

        heading: {
            options: [
                { model: 'paragraph', view: 'p', title: '본문', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: '헤더1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: '헤더2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: '헤더3', class: 'ck-heading_heading3' },
            ],
        },
        highlight: {
            options: [
                {
                    model: 'yellowMarker',
                    class: 'yellow-green',
                    title: 'Yellow marker',
                    color: 'var(--ck-highlight-marker-yellow)',
                    type: 'marker',
                },
            ],
        },
        fontSize: {
            options: [10, 11, 12, 13, 14, 15, 16, 17, 18],
        },

        fontColor: {
            colors: [
                {
                    color: 'hsl(0, 0%, 0%)',
                    label: 'Black',
                },
                {
                    color: 'hsl(0, 0%, 30%)',
                    label: 'Dim grey',
                },
                {
                    color: 'hsl(0, 0%, 60%)',
                    label: 'Grey',
                },
                {
                    color: 'hsl(0, 0%, 90%)',
                    label: 'Light grey',
                },
                {
                    color: 'hsl(0, 0%, 100%)',
                    label: 'White',
                    hasBorder: true,
                },
            ],
        },
        fontBackgroundColor: {
            colors: [
                {
                    color: 'hsl(0, 75%, 60%)',
                    label: 'Red',
                },
                {
                    color: 'hsl(30, 75%, 60%)',
                    label: 'Orange',
                },
                {
                    color: 'hsl(60, 75%, 60%)',
                    label: 'Yellow',
                },
                {
                    color: 'hsl(90, 75%, 60%)',
                    label: 'Light green',
                },
                {
                    color: 'hsl(120, 75%, 60%)',
                    label: 'Green',
                },
                // More colors.
                // ...
            ],
        },

        alignment: {
            options: ['justify', 'left', 'center', 'right'],
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
        console.log(body);
        if (!postData._id) {
            // 새 게시글
            dispatch({
                type: TYPE.POST_UPLOADING_REQUEST,
                payload: body,
            });
            history.push('/');
            toast('게시글을 작성하였습니다.');
        } else {
            // 편집 게시글
            dispatch({
                type: TYPE.POST_EDIT_UPLOADING_REQUEST,
                payload: { ...body, id: postData._id },
            });
            history.push(`/post/${params.id}`);
            toast('게시글을 수정하였습니다.');
        }
    };
    console.log(postData, '<postDatapostDatapostData');
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
                    value={form.title}
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
                data={form.contents || ''}
            />
            <div className="category-wrap">
                <p>카테고리</p>
                <select
                    onChange={(e) => {
                        console.log(e.target);
                        setForm({ ...form, category: e.target.value });
                    }}
                    value={form.category}
                >
                    <option value="일상">일상</option>
                    <option value="개발기록">개발기록</option>
                </select>
            </div>
        </div>
    );
};

export default withRouter(Posting);
