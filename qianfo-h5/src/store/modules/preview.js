const state = () => ({
    list: [],
    /** 预览图片数组 */
    show: false,
    /** 预览图片组件显示 */
    index: 0,
    /** 预览图片当前 */
})
const mutations = {
    showImagePreview(state, data) {
        /** 打开组件,如果传了状态就使用状态，否则与上次相反 */
        state.show = data ? data.show : !state.show;
    },
    updateImagePreview(state, data) {
        /** 更新预览内容，然后一定会打开 */

        state.list = data.list;
        state.index = data.index;
        state.show = true;
    }

}
const actions = {

}
export default {
    state,
    mutations,
    actions
}