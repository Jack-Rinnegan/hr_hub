const workman={template:`

<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
Add Workman
</button>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            Workman Id
        </th>
        <th>
            Workman Name
        </th>
        <th>
            Department
        </th>
        <th>
            HireDate
        </th>
        <th>
            Options
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="emp in workmans">
        <td>{{emp.WorkmanId}}</td>
        <td>{{emp.WorkmanName}}</td>
        <td>{{emp.Department}}</td>
        <td>{{emp.HireDate}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(emp)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(emp.WorkmanId)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                </svg>
            </button>
        </td>
    </tr>
</tbody>
</thead>
</table>

<div class="modal fade" id="exampleModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="True">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
    </div>
    
    <div class="modal-body">
    <div class="d-flex flex-row db-highlight mb-3">
        <div class="p-2 w-50 bd-highlight">
        <div class="input-group mb-3">
            <span class="input-group-text">Name</span>
            <input type="text" class="form-control" v-model="WorkmanName">
        </div>
        
        <div class="input-group mb-3">
            <span class="input-group-text">Department</span>
            <select class="form-select" v-model="Department">
                <option v-for="dep in departments">
                {{dep.DepartmentName}}
                </option>
            </select>
        </div>
        
        <div class="input-group mb-3">
            <span class="input-group-text">HireDate</span>
            <input type="date" class="form-control" v-model="HireDate">
        </div>
        
        </div>
        <div class="p-2 w-50 bd-highlight">
            <img width="250px" height="250px"
             :src="PhotoPath+PhotoFileName"/>
             <input type="file" class="m-2" @change="ImageUpload">
        </div>
    </div> 
        <button type="button" @click="createClick()"
        v-if="WorkmanId==0" class="btn btn-primary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="WorkmanId!=0" class="btn btn-primary">
        Update
        </button>
        
    </div>

    </div>
    </div>
    </div>
</div>

`,

data(){
    return{
        departments:[],
        workmans:[],
        modalTitle:"",
        WorkmanId:0,
        WorkmanName:"",
        Department:"",
        HireDate:"",
        PhotoFileName:"anonymous.png",
        PhotoPath:variables.PHOTO_URL
    }
},
    methods:{
        refreshData(){
            axios.get(variables.API_URL+"workman")
                .then((response)=>{
                    this.workmans=response.data;
                });

            axios.get(variables.API_URL+"department")
                .then((response)=>{
                    this.departments=response.data;
                });
        },
        addClick(){
            this.modalTitle="Add Workman";
            this.WorkmanId=0;
            this.WorkmanName="";
            this.Department="";
            this.HireDate="";
            this.PhotoFileName="anonymous.png"
        },
        editClick(emp){
            this.modalTitle="Edit Workman";
            this.WorkmanId=emp.WorkmanId;
            this.WorkmanName=emp.WorkmanName;
            this.Department=emp.Department;
            this.HireDate=emp.HireDate;
            this.PhotoFileName=emp.PhotoFileName
        },
        createClick(){
            axios.post(variables.API_URL+"workman",{
                WorkmanName:this.WorkmanName,
                Department:this.Department,
                HireDate:this.HireDate,
                PhotoFileName:this.PhotoFileName
            })
                .then((response)=>{
                    this.refreshData();
                    alert(response.data);

                });
        },
        updateClick(){
            axios.put(variables.API_URL+"workman",{
                WorkmanId:this.WorkmanId,
                WorkmanName:this.WorkmanName,
                Department:this.Department,
                HireDate:this.HireDate,
                PhotoFileName:this.PhotoFileName
            })
                .then((response)=>{
                    this.refreshData();
                    alert(response.data);

                });
        },
        deleteClick(id){
            if(!confirm("Are u sure?")){
                return;
            }
            axios.delete(variables.API_URL+"workman/"+id)
                .then((response)=>{
                    this.refreshData();
                    alert(response.data);
                });
        },
        ImageUpload(event){
            let formData=new FormData();
            formData.append('file',event.target.files[0]);
            axios.post(
                variables.API_URL+"workman/savefile",
                formData
            ).then((response)=>{
                this.PhotoFileName=response.data;
            });
        }
    },
    mounted:function (){
        this.refreshData();
    }
}