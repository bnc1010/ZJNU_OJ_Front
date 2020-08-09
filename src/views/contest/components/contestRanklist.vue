<template>
    <div>
        <el-card></el-card>
        <el-card class="bodybox">
            <el-table
                :data="tableData"
                width="100%">
                <div v-for="(x, index) in columns" :key="'col' + index">
                    <el-table-column :label="x.label" :width="x.width" align="center" >
                        <template slot-scope="scope">
                            <div v-if="getTypeOfColumn(x.prop) == 1">
                               <div>
                                   {{getProp(scope.row, [x.prop, 'firstTime'])}}
                               </div>
                            </div>
                            <div v-else-if="getTypeOfColumn(x.prop) == 2">
                                {{getProp(scope.row, [x.prop, 'acceptCount'])}}
                            </div>
                            <div v-else-if="getTypeOfColumn(x.prop) == 3">
                                {{getProp(scope.row, [x.prop])}}
                            </div>
                        </template>
                    </el-table-column>
                </div>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    name:"ContestRankList",
    data() {
      return {
        columns:[
            {

            },
            {
                prop:'username',
                label:'用户名',
                width:200
            },
            {
                prop:'total',
                label:'总分',
                width:100
            },
            {
                prop:'A',
                label:'A',
                width:100
            },
            {
                prop:'B',
                label:'B',
                width:100
            },
            {
                prop:'C',
                label:'C',
                width:100
            },
        ],
        tableData: [{
          username: '王小虎',
          total: {
              acceptCount:0,
              totalTime:0
          },
          A:{
              isAccept:false,
              try:1,
              firstTime:0
          },
          B:{
              isAccept:false,
              try:1,
              firstTime:0
          },
          C:{
              isAccept:false,
              try:1,
              firstTime:0
          },
        }]
      }
    },
    methods:{
        getTypeOfColumn: function(prop){
            if(!prop){
                return -1
            }
            if(prop && prop.length == 1 && /[A-Z]{1}/.test(prop)){//是题目的cell
                return 1
            }
            else if(prop == 'total'){
                return 2
            }
            else if(prop == 'username'){
                return 3
            }
            else{
                return 0
            }
        },
        getProp: function(object, props){
            let pp = ''
            for(let x in props){
                pp += '.' + props[x]
            }
            return eval('object' + pp)
        }
    },
    computed:{
        getTableWidth: function() {
            let width = 0
            for(let id in this.columns){
                width += this.columns[id].width
            }
            return width
        }
    },
    mounted(){
        
    }
}
</script>
<style scoped>
.bodybox{
  margin-top: 20px;
}


</style>