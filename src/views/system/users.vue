<script setup>
import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';
import AppCard from '../../components/common/AppCard.vue';
import { getUserList } from '../../api/api.js';

// --- 数据状态 ---
const userList = ref([]);
const loading = ref(false);
const total = ref(0);
const queryParams = reactive({
    username: '',
    mobile: '',
    page: 1,
    pageSize: 10
});

// --- 弹窗控制 ---
const showModal = ref(false);
const isEdit = ref(false);
const currentForm = reactive({
    id: null,
    username: '',
    mobile: '',
    gender: 0,
    status: 1
});

// --- 核心方法 ---
const fetchList = async () => {
    loading.value = true;
    try {
        // 注意：此处根据实际接口调整参数传递方式
        const res = await getUserList(queryParams);
        
        // 假设接口返回结构为 { data: { list: [], total: 0 } }
        userList.value = res.data 
        total.value = res.data.length;
    } catch (error) {
        alert("获取列表失败");
    } finally {
        loading.value = false;
    }
};

const handleQuery = () => {
    queryParams.page = 1;
    fetchList();
};

const openAddModal = () => {
    isEdit.value = false;
    Object.assign(currentForm, { id: null, username: '', mobile: '', gender: 0, status: 1 });
    showModal.value = true;
};

const openEditModal = (row) => {
    isEdit.value = true;
    Object.assign(currentForm, { ...row });
    showModal.value = true;
};

const handleSubmit = async () => {
    const url = isEdit.value ? `http://localhost:3000/users/update` : `http://localhost:3000/users/add`;
    await axios.post(url, currentForm);
    alert(isEdit.value ? "修改成功" : "新增成功");
    showModal.value = false;
    fetchList();
};

const handleDelete = async (id) => {
    if (confirm("确定删除该用户吗？")) {
        await axios.post(`http://localhost:3000/users/delete`, { id });
        fetchList();
    }
};

onMounted(fetchList);
</script>

<template>
    <AppCard bordered class="cus-scroll m-4 h-0 flex-1 rounded-8 p-4">
        <h2>用户管理</h2>

        <div class="search-bar">
            <input v-model="queryParams.username" placeholder="用户名" />
            <input v-model="queryParams.mobile" placeholder="手机号" />
            <button @click="handleQuery" class="btn-primary">查询</button>
            <button @click="openAddModal" class="btn-success">新增用户</button>
        </div>

        <div class="table-wrapper">
            <table class="native-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>手机号</th>
                        <th>性别</th>
                        <th>状态</th>
                        <th>注册时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userList" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.mobile }}</td>
                        <td>{{ user.gender === 1 ? '男' : '女' }}</td>
                        <td>
                            <span :class="user.status === 1 ? 'status-active' : 'status-disabled'">
                                {{ user.status === 1 ? '启用' : '禁用' }}
                            </span>
                        </td>
                        <td>{{ new Date(user.create_time).toLocaleString() }}</td>
                        <td>
                            <button @click="openEditModal(user)" class="btn-text">编辑</button>
                            <button @click="handleDelete(user.id)" class="btn-text btn-danger">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <span>共 {{ total }} 条</span>
            <button :disabled="queryParams.page === 1" @click="queryParams.page--; fetchList()">上一页</button>
            <span>第 {{ queryParams.page }} 页</span>
            <button @click="queryParams.page++; fetchList()">下一页</button>
        </div>

        <div v-if="showModal" class="modal-mask">
            <div class="modal-content">
                <h3>{{ isEdit ? '修改用户' : '新增用户' }}</h3>
                <div class="form-item">
                    <label>用户名:</label>
                    <input v-model="currentForm.username" />
                </div>
                <div class="form-item">
                    <label>手机号:</label>
                    <input v-model="currentForm.mobile" />
                </div>
                <div class="form-item">
                    <label>状态:</label>
                    <select v-model="currentForm.status">
                        <option :value="1">启用</option>
                        <option :value="0">禁用</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button @click="showModal = false">取消</button>
                    <button @click="handleSubmit" class="btn-primary">确定</button>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<style scoped>
.admin-container { padding: 20px; font-family: sans-serif; }
.search-bar { margin-bottom: 20px; display: flex; gap: 10px; }
.search-bar input { padding: 8px; border: 1px solid #ddd; border-radius: 4px; }

.native-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.native-table th, .native-table td { border: 1px solid #eee; padding: 12px; text-align: left; }
.native-table th { background-color: #f8f9fa; }
.native-table tr:hover { background-color: #f5f5f5; }

.btn-primary { background: #1890ff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
.btn-success { background: #52c41a; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
.btn-text { background: none; border: none; color: #1890ff; cursor: pointer; margin-right: 10px; }
.btn-danger { color: #ff4d4f; }

.status-active { color: #52c41a; }
.status-disabled { color: #999; }

.pagination { display: flex; align-items: center; gap: 15px; margin-top: 10px; }

/* 简易弹窗样式 */
.modal-mask { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
.modal-content { background: white; padding: 25px; border-radius: 8px; width: 400px; }
.form-item { margin-bottom: 15px; display: flex; flex-direction: column; }
.form-item label { margin-bottom: 5px; font-weight: bold; }
.modal-footer { text-align: right; margin-top: 20px; }
</style>