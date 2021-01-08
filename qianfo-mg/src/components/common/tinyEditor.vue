<template>
    <div>
        <textarea name :id="id" v-model="contentValue" cols="30" rows="10"></textarea>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
// import editor from '@tinymce/tinymce-vue';
export default {
    name: 'tinyEditor',
    props: ['more', 'content'],
    // components: {
    //     editor
    // },

    watch: {
        content: {
            handler(val) {
                if (!val) {
                    val = '';
                    this.first = false;
                } else {
                }
                this.contentValue = val;
                if (this.$props.more) {
                    this.$nextTick(() => {
                        if (tinymce.get(this.id)) {
                            {
                                tinymce.get(this.id).setContent(val);
                            }
                        }
                    });
                }
            },
            immediate: true
        },
        contentValue(val) {},
        $route(to, form) {
            this.$nextTick(() => {
                tinymce.get(this.id).setContent(this.contentValue);
            });
        }
    },
    data() {
        let that = this;
        return {
            id: '',
            contentValue: ''
        };
    },
    created() {
        let id = uuidv4();
        this.id = id;
    },
    activated() {
        console.log('activated');
    },
    beforeDestroy() {
        tinymce.get(this.id).destroy();
    },
    mounted() {
        this.$nextTick(() => {
            this.init();
        });
    },

    methods: {
        /**
         * 设置内容
         */
        setContent(value) {
            // this.$nextTick(() => {
            //     tinymce.get(this.id).setContent(val);
            // });
        },
        /**
         * 返回值
         */
        getContent() {
            return tinymce.get(this.id).getContent();
        },
        /**
         * 初始化
         */
        init() {
            let that = this;

            // this.$emit('init', id);
            tinymce.init({
                selector: '#' + this.id,
                height: 500,
                width: '100%',
                language: 'zh_CN',
                menubar: false,
                resize: false,
                paste_data_images: true,
                plugins: ['image', 'link', 'print', 'media', 'preview'],
                toolbar:
                    'bold italic backcolor forecolor fontsizeselect  | styleselect  | alignleft aligncenter alignright alignjustify |  image media link print preview',
                images_upload_handler: (blobInfo, success, error) => {
                    var file = blobInfo.blob(); //转为file对象。
                    var type = file.type;
                    if (type != 'image/jpeg' && type != 'image/png' && type != 'image/gif') {
                        error(new Error('请上传正确的图片'));
                        return;
                    }
                    let formData = new FormData();
                    formData.append('file', file);
                    that.$axios
                        .post('/general/upload', formData, {
                            baseURL: ''
                        })
                        .then((res) => {
                            success(res);
                        })
                        .catch((err) => {
                            error(new Error(err || err.msg));
                        });
                },
                setup(editor) {
                    editor.on('keyup', (res) => {
                        this.inputChange = true;
                        console.log(this.inputChange);

                        that.$emit('change', editor.getContent());
                    });
                    editor.on('SetContent', (res) => {
                        this.inputChange = true;
                        console.log(this.inputChange);

                        that.$emit('change', editor.getContent());
                    });
                },
                file_picker_types: 'file  media',
                file_picker_callback: (callBack, value, meta) => {
                    console.log(meta);
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'file');
                    input.click();
                    input.onchange = function (e) {
                        console.log(e);
                        var file = this.files[0];
                        var type = file.type;
                        let formData = new FormData();
                        formData.append('file', file);
                        that.$message.success('正在上传文件，请不要关闭弹窗');
                        that.$axios
                            .post('/general/upload', formData, {
                                baseURL: ''
                            })
                            .then((res) => {
                                callBack(res);
                            })
                            .catch((err) => {
                                callBack('');
                            });
                    };
                },
                media_live_embeds: true,
                //插入音频
                audio_template_callback: function (data) {},
                //插入视频
                video_template_callback: function (data) {
                    console.log(data);
                    return (
                        '<video width="' +
                        data.width +
                        '" height="' +
                        data.height +
                        '"' +
                        (data.poster ? ' poster="' + data.poster + '"' : '') +
                        ' controls="controls">\n' +
                        '<source src="' +
                        data.source +
                        '"' +
                        (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') +
                        '</video>'
                    );
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.tox {
    z-index: 3000;
}
.tox-notifications-container {
    display: none !important;
}
</style>
