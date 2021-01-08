 <template>
    <detailShow :setting="setting"></detailShow>
</template> 

<script>
export default {
    components: {
        detailShow: () => import('../../view/detailShow')
    },
    data() {
        return {
            setting: {}
        };
    },
    created() {
        let detail = sessionStorage.getItem('detail');
        if (detail) {
            this.setting = JSON.parse(detail);
        }
    }
};
</script>

<style>
</style>