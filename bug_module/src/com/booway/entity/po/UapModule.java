package com.booway.entity.po;


/**
 * UapModule
 * @author may
 * @date 2017-08-29
 */
public class UapModule implements java.io.Serializable {
	
    private static final long serialVersionUID = -2886661480899069062L;

    /** id*/
	
	private String id;
	
	/** name*/
	
	private String name;
	
	/** project_id*/
	
	private String projectId;
	
	
	/**虚拟主键*/
	private String mxVirtualId;
	

    /** 无参构造方法 */
    public UapModule() {
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
		 buffer.append("mxVirtualId").append("='").append(getMxVirtualId()).append("' ");			
		 buffer.append("]");
      
         return buffer.toString();
     }

	public boolean equals(Object other) {
        if ( (this == other ) ) return true;
		if ( (other == null ) ) return false;
		if ( !(other instanceof UapModule) ) return false;
		UapModule castOther = ( UapModule ) other; 
         
		return ( (this.getId()==castOther.getId()) || ( this.getId()!=null && castOther.getId()!=null && this.getId().equals(castOther.getId()) ) )
 && ( (this.getName()==castOther.getName()) || ( this.getName()!=null && castOther.getName()!=null && this.getName().equals(castOther.getName()) ) )
 && ( (this.getProjectId()==castOther.getProjectId()) || ( this.getProjectId()!=null && castOther.getProjectId()!=null && this.getProjectId().equals(castOther.getProjectId()) ) )
 && ( (this.getMxVirtualId()==castOther.getMxVirtualId()) || ( this.getMxVirtualId()!=null && castOther.getMxVirtualId()!=null && this.getMxVirtualId().equals(castOther.getMxVirtualId()) ) );
   }
   
   public int hashCode() {
       int result = 17;
         
		result = 37 * result + ( getId() == null ? 0 : this.getId().hashCode() );
		result = 37 * result + ( getName() == null ? 0 : this.getName().hashCode() );
		result = 37 * result + ( getProjectId() == null ? 0 : this.getProjectId().hashCode() );
		result = 37 * result + ( getMxVirtualId() == null ? 0 : this.getMxVirtualId().hashCode() );
		return result;
   }   

}
