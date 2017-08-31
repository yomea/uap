package com.booway.entity.po;

import java.util.Date;

/**
 * UapBug
 * @author may
 * @date 2017-08-29
 */
public class UapBug implements java.io.Serializable {
	
    private static final long serialVersionUID = 8093325870076103484L;

    /** id*/
	
	private String id;
	
	/** name*/
	
	private String name;
	
	/** project_id*/
	
	private String projectId;
	
	/** module_id*/
	
	private String moduleId;
	
	/** bug_state*/
	
	private String bugState;
	
	/** bug_level*/
	
	private String bugLevel;
	
	/** bug_creater*/
	
	private String bugCreater;
	
	/** bug_ctime*/
	
	private Date bugCtime;
	
	/** bug_desc*/
	
	private String bugDesc;
	
	/** bug_file*/
	
	private String bugFile;
	
	
	/**虚拟主键*/
	private String mxVirtualId;
	

    /** 无参构造方法 */
    public UapBug() {
    } 
    
	 	   
	
	
    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
	
	
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
	
	
    public String getProjectId() {
        return this.projectId;
    }
    
    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
	
	
    public String getModuleId() {
        return this.moduleId;
    }
    
    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }
	
	
    public String getBugState() {
        return this.bugState;
    }
    
    public void setBugState(String bugState) {
        this.bugState = bugState;
    }
	
	
    public String getBugLevel() {
        return this.bugLevel;
    }
    
    public void setBugLevel(String bugLevel) {
        this.bugLevel = bugLevel;
    }
	
	
    public String getBugCreater() {
        return this.bugCreater;
    }
    
    public void setBugCreater(String bugCreater) {
        this.bugCreater = bugCreater;
    }
	
	
    public Date getBugCtime() {
        return this.bugCtime;
    }
    
    public void setBugCtime(Date bugCtime) {
        this.bugCtime = bugCtime;
    }
	
	
    public String getBugDesc() {
        return this.bugDesc;
    }
    
    public void setBugDesc(String bugDesc) {
        this.bugDesc = bugDesc;
    }
	
	
    public String getBugFile() {
        return this.bugFile;
    }
    
    public void setBugFile(String bugFile) {
        this.bugFile = bugFile;
    }
	
	
    public String getMxVirtualId() {
        return this.mxVirtualId;
    }
    
    public void setMxVirtualId(String mxVirtualId) {
        this.mxVirtualId = mxVirtualId;
    }
	

     public String toString() {
         StringBuffer buffer = new StringBuffer();

		 buffer.append(getClass().getName()).append("@").append(Integer.toHexString(hashCode())).append(" [");
		 buffer.append("id").append("='").append(getId()).append("' ");			
		 buffer.append("name").append("='").append(getName()).append("' ");			
		 buffer.append("projectId").append("='").append(getProjectId()).append("' ");			
		 buffer.append("moduleId").append("='").append(getModuleId()).append("' ");			
		 buffer.append("bugState").append("='").append(getBugState()).append("' ");			
		 buffer.append("bugLevel").append("='").append(getBugLevel()).append("' ");			
		 buffer.append("bugCreater").append("='").append(getBugCreater()).append("' ");			
		 buffer.append("bugCtime").append("='").append(getBugCtime()).append("' ");			
		 buffer.append("bugDesc").append("='").append(getBugDesc()).append("' ");			
		 buffer.append("bugFile").append("='").append(getBugFile()).append("' ");			
		 buffer.append("mxVirtualId").append("='").append(getMxVirtualId()).append("' ");			
		 buffer.append("]");
      
         return buffer.toString();
     }

	public boolean equals(Object other) {
        if ( (this == other ) ) return true;
		if ( (other == null ) ) return false;
		if ( !(other instanceof UapBug) ) return false;
		UapBug castOther = ( UapBug ) other; 
         
		return ( (this.getId()==castOther.getId()) || ( this.getId()!=null && castOther.getId()!=null && this.getId().equals(castOther.getId()) ) )
 && ( (this.getName()==castOther.getName()) || ( this.getName()!=null && castOther.getName()!=null && this.getName().equals(castOther.getName()) ) )
 && ( (this.getProjectId()==castOther.getProjectId()) || ( this.getProjectId()!=null && castOther.getProjectId()!=null && this.getProjectId().equals(castOther.getProjectId()) ) )
 && ( (this.getModuleId()==castOther.getModuleId()) || ( this.getModuleId()!=null && castOther.getModuleId()!=null && this.getModuleId().equals(castOther.getModuleId()) ) )
 && ( (this.getBugState()==castOther.getBugState()) || ( this.getBugState()!=null && castOther.getBugState()!=null && this.getBugState().equals(castOther.getBugState()) ) )
 && ( (this.getBugLevel()==castOther.getBugLevel()) || ( this.getBugLevel()!=null && castOther.getBugLevel()!=null && this.getBugLevel().equals(castOther.getBugLevel()) ) )
 && ( (this.getBugCreater()==castOther.getBugCreater()) || ( this.getBugCreater()!=null && castOther.getBugCreater()!=null && this.getBugCreater().equals(castOther.getBugCreater()) ) )
 && ( (this.getBugCtime()==castOther.getBugCtime()) || ( this.getBugCtime()!=null && castOther.getBugCtime()!=null && this.getBugCtime().equals(castOther.getBugCtime()) ) )
 && ( (this.getBugDesc()==castOther.getBugDesc()) || ( this.getBugDesc()!=null && castOther.getBugDesc()!=null && this.getBugDesc().equals(castOther.getBugDesc()) ) )
 && ( (this.getBugFile()==castOther.getBugFile()) || ( this.getBugFile()!=null && castOther.getBugFile()!=null && this.getBugFile().equals(castOther.getBugFile()) ) )
 && ( (this.getMxVirtualId()==castOther.getMxVirtualId()) || ( this.getMxVirtualId()!=null && castOther.getMxVirtualId()!=null && this.getMxVirtualId().equals(castOther.getMxVirtualId()) ) );
   }
   
   public int hashCode() {
       int result = 17;
         
		result = 37 * result + ( getId() == null ? 0 : this.getId().hashCode() );
		result = 37 * result + ( getName() == null ? 0 : this.getName().hashCode() );
		result = 37 * result + ( getProjectId() == null ? 0 : this.getProjectId().hashCode() );
		result = 37 * result + ( getModuleId() == null ? 0 : this.getModuleId().hashCode() );
		result = 37 * result + ( getBugState() == null ? 0 : this.getBugState().hashCode() );
		result = 37 * result + ( getBugLevel() == null ? 0 : this.getBugLevel().hashCode() );
		result = 37 * result + ( getBugCreater() == null ? 0 : this.getBugCreater().hashCode() );
		result = 37 * result + ( getBugCtime() == null ? 0 : this.getBugCtime().hashCode() );
		result = 37 * result + ( getBugDesc() == null ? 0 : this.getBugDesc().hashCode() );
		result = 37 * result + ( getBugFile() == null ? 0 : this.getBugFile().hashCode() );
		result = 37 * result + ( getMxVirtualId() == null ? 0 : this.getMxVirtualId().hashCode() );
		return result;
   }   

}
