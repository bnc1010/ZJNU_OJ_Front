<template>
    <div class="app-container">
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-button type="primary" plain @click="addDialogVisible = true">新建题单</el-button>
                </el-col>
                <el-col :span="12"></el-col>
                <el-col :span="6"></el-col>
            </el-row>
        </el-card>
        <el-card class="Box">
            <center>
                <el-table :data="tagTable" style="width: 75%">
                    <el-table-column label="id" width="150">
                        <template slot-scope="scope">
                            {{scope.row.id}}
                        </template>
                    </el-table-column>
                    <el-table-column label="标签名" width="250">
                        <template slot-scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                    <el-table-column align='right'>
                        <template slot-scope="scope">
                            <el-button type="warning" plain size="small" @click="handleEditButton(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </center>
        </el-card>

        <el-dialog
        title="新建标签"
        :visible.sync="addDialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>
            <el-form label-position="left" label-width="120px" :model="addTag">
                <el-form-item label="标签名">
                    <el-input v-model="addTag.tagname" style="width:300px"></el-input>
                </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog
        title="新建标签"
        :visible.sync="editDialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>
            <el-form label-position="left" label-width="120px" :model="editTag">
                <el-form-item label="标签名">
                    <el-input v-model="editTag.name" style="width:300px"></el-input>
                </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleEdit">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import { getTagList, addTag, editTag } from '@/api/tag'

export default {
    name:'TagAdmin',
    data(){
        return {
            tagTable: [],
            addDialogVisible: false,
            editDialogVisible: false,
            addTag:{
                tagname: '',
            },
            editTag: {
                name:'',
                score: ''
            }
        }
    },
    mounted(){
        this.flushTagList()
    },
    methods: {
        flushTagList: function() {
            getTagList().then( res => {
                this.tagTable = res.data
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        handleClose: function() {
            this.addTag = {
                tagname: '',
            }
            this.editTag = {}
            this.addDialogVisible = false
            this.editDialogVisible = false
        },
        handleAdd: function() {
            addTag(this.addTag).then( res => {
                this.$message({
                    type: 'success',
                    message: '添加成功'
                })
                this.flushTagList()
            }).catch( err =>{
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
            this.handleClose()
        },
        handleEditButton: function(tag) {
            this.editTag = tag
            this.editDialogVisible = true
        },
        handleEdit: function() {
            editTag(this.editTag).then( res => {
                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
                this.flushTagList()
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
            this.handleClose()
        }
    }
}
</script>
<style scoped>
.Box{
    margin-top: 20px;
}
</style>