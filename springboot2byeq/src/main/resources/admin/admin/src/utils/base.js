const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot2byeq/",
            name: "springboot2byeq",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot2byeq/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "科研管理系统"
        } 
    }
}
export default base
