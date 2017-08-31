package com.booway.User.po;

import java.util.Set;
import org.hibernate.validator.constraints.NotBlank;
import java.util.HashSet;

/**
 * ProductType
 * @author may
 * @date 2017-08-13
 */
public class ProductType implements java.io.Serializable {
	
	
    
	/** typeId*/
	@NotBlank(message="不能为空") 
	private String typeid;
	
	
	
	private Set<TProduct> tproducts = new HashSet<TProduct>(0);
	
	/** typeName*/
	@NotBlank(message="不能为空") 
	private String typename;
	
	
	/**虚拟主键*/
	private String mxVirtualId;
	

    /** 无参构造方法 */
    public ProductType() {
    } 
    
		
	/** 构造方法 */
	public ProductType(String typeid, String typename) {
	    this.typeid = typeid;
	    this.typename = typename;
	 }
	 	   
	
	
    public String getTypeid() {
        return this.typeid;
    }
    
    public void setTypeid(String typeid) {
        this.typeid = typeid;
    }
	
	
    public Set<TProduct> getTproducts() {
        return this.tproducts;
    }
    
    public void setTproducts(Set<TProduct> tproducts) {
        this.tproducts = tproducts;
    }
	
	
    public String getTypename() {
        return this.typename;
    }
    
    public void setTypename(String typename) {
        this.typename = typename;
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
		 buffer.append("typeid").append("='").append(getTypeid()).append("' ");			
		 buffer.append("typename").append("='").append(getTypename()).append("' ");			
		 buffer.append("mxVirtualId").append("='").append(getMxVirtualId()).append("' ");			
		 buffer.append("]");
      
         return buffer.toString();
     }

	public boolean equals(Object other) {
        if ( (this == other ) ) return true;
		if ( (other == null ) ) return false;
		if ( !(other instanceof ProductType) ) return false;
		ProductType castOther = ( ProductType ) other; 
         
		return ( (this.getTypeid()==castOther.getTypeid()) || ( this.getTypeid()!=null && castOther.getTypeid()!=null && this.getTypeid().equals(castOther.getTypeid()) ) )
 && ( (this.getTypename()==castOther.getTypename()) || ( this.getTypename()!=null && castOther.getTypename()!=null && this.getTypename().equals(castOther.getTypename()) ) )
 && ( (this.getMxVirtualId()==castOther.getMxVirtualId()) || ( this.getMxVirtualId()!=null && castOther.getMxVirtualId()!=null && this.getMxVirtualId().equals(castOther.getMxVirtualId()) ) );
   }
   
   public int hashCode() {
       int result = 17;
         
		result = 37 * result + ( getTypeid() == null ? 0 : this.getTypeid().hashCode() );
		
		result = 37 * result + ( getTypename() == null ? 0 : this.getTypename().hashCode() );
		result = 37 * result + ( getMxVirtualId() == null ? 0 : this.getMxVirtualId().hashCode() );
		return result;
   }   

}
