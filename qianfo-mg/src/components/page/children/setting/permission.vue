<template>
    <div>
        <div v-for="(item,index) in permissions" :key="'first'+index">
            <div>
                <el-checkbox
                    :label="item.name"
                    @change="handleCheckAllChange($event, item)"
                    v-model="item.allCheck"
                    :indeterminate="indeterminate(item, 'allCheck')"
                    v-if="!disalbeEdit"
                ></el-checkbox>
                <div v-else>{{ item.name }}</div>
            </div>
            <div class="flex-row flex-wrap" v-if="item.permissions && item.permissions.length">
                <div
                    v-for="(permission,pIndex) in item.permissions"
                    :key="'second'+pIndex"
                    style="padding-left:32px;margin-top:10px"
                >
                    <el-checkbox
                        :label="permission.name"
                        v-model="permission.check"
                        @change="onPermissionCheck($event, item, permission)"
                        v-if="!disalbeEdit"
                    ></el-checkbox>
                    <div v-else :class="{ active: permission.check }">{{ permission.name }}</div>
                </div>
            </div>
            <div
                v-for="(it,ix) in item.sub"
                :key="'three'+ix"
                style="padding-left:32px;margin-top:10px"
            >
                <div>
                    <el-checkbox
                        :label="it.name"
                        @change="handleCheckAllChange($event, it)"
                        v-model="it.allCheck"
                        :indeterminate="indeterminate(it, 'check')"
                        v-if="!disalbeEdit"
                    ></el-checkbox>
                    <div v-else>{{ it.name }}</div>
                </div>
                <div class="flex-row flex-wrap">
                    <div
                        v-for="(permission,pIx) in it.permissions"
                        :key="'four'+pIx"
                        style="padding-left:32px;margin-top:10px"
                    >
                        <el-checkbox
                            :label="permission.name"
                            v-model="permission.check"
                            @change="onPermissionCheck($event, item, it, permission)"
                            v-if="!disalbeEdit"
                        ></el-checkbox>
                        <div v-else :class="{ active: permission.check }">{{ permission.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    props: ['manager', 'role', 'editMode'],
    data() {
        return {
            permissions: [],
            selected: []
        };
    },
    created() {
        this.getPermissions();
    },
    watch: {
        permissions: {
            handler(val) {
                this.selected = [];
                this.getAllCheckedPermission(this.permissions);
                this.$emit('checked', this.selected);
            },
            deep: true
        },
        manager() {
            this.getPermissions();
        },
        role() {
            this.getPermissions();
        }
    },
    computed: {
        disalbeEdit() {
            return (this.role || this.manager) && !this.editMode;
        }
    },
    methods: {
        getAllCheckedPermission(permissions) {
            permissions.forEach((it) => {
                if (it.permissions && it.permissions.length) {
                    it.permissions.forEach((it) => {
                        if (it.check) {
                            this.selected.push(it);
                        }
                    });
                }
                if (it.sub && it.sub.length) {
                    this.getAllCheckedPermission(it.sub);
                }
            });
        },
        indeterminate(item) {
            let key = item.sub && item.sub.length ? 'allCheck' : 'check';
            let length1 = item.sub.filter((it) => {
                return it[key];
            }).length;
            let length2 = item.permissions.filter((it) => {
                return it[key];
            }).length;

            if ((length1 > 0 && length1 == item.sub.length) || (length2 > 0 && length2 == item.permissions.length)) {
                Vue.set(item, 'allCheck', true);
            } else {
                Vue.set(item, 'allCheck', false);
            }
            return (length1 > 0 && length1 < item.sub.length) || (length2 > 0 && length2 < item.permissions.length);
        },
        getPermissions() {
            let vm = this;
            let query = {};
            if (this.manager) {
                query.manager = this.manager;
            }
            if (this.role) {
                query.role = this.role;
            }
            this.$axios
                .get('bd/rewrite/auth/permission', {
                    params: query
                })
                .then((it) => {
                    vm.permissions = it;
                });
        },
        handleCheckAllChange(check, item) {
            this.doCheckItem(item, check);
            Vue.set(item, 'allCheck', check);
        },
        doCheckItem(item, check) {
            item.sub.forEach((it) => {
                Vue.set(it, 'check', check);
                if ((it.sub && it.sub.length) || (it.permissions && it.permissions.length)) {
                    this.doCheckItem(it, check);
                }
            });
            item.permissions.forEach((it) => {
                Vue.set(it, 'check', check);
            });
        },
        onPermissionCheck(check, item, it, permission) {}
    }
};
</script>
<style scoped>
.active {
    color: #409eff;
}
</style>
