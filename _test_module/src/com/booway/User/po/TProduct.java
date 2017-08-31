package com.booway.User.po;

import com.sgcc.uap.service.validator.constraints.Figure;
import org.hibernate.validator.constraints.NotBlank;

/**
 * TProduct
 * @author may
 * @date 2017-08-13
 */
public class TProduct implements java.io.Serializable {
	
	
    
	/** productId*/
	@Figure(min="1",max="111111111111111111111",message="必须为数字") 
	private String productid;
	
	
	
	private ProductType producttype;
	
	/** name*/
	@NotBlank(message="不能为空") 
	private String name;
	
	
	/**虚拟主键*/
	private String mxVirtualId;
	

    /** 无参构造方法 */
    public TProduct() {
    } 
    
		
	/** 构造方法 */
	public TProduct(String productid, String name) {
	    this.productid = productid;
	    this.name = name;
	 }
	 	   
	
	
    public String getProductid() {
        return this.productid;
    }
    
    public void setProductid(String productid) {
        this.productid = productid;
    }
	
	
    public ProductType getProducttype() {
        return this.producttype;
    }
    
    public void setProducttype(ProductType producttype) {
        this.producttype = producttype;
    }
	
	
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
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
		 buffer.append("productid").append("='").append(getProductid()).append("' ");			
		 buffer.append("producttype").append("='").append(getProducttype()).append("' ");			
		 buffer.append("name").append("='").append(getName()).append("' ");			
		 buffer.append("mxVirtualId").append("='").append(getMxVirtualId()).append("' ");			
		 buffer.append("]");
      
         return buffer.toString();
     }

	public boolean equals(Object other) {
        if ( (this == other ) ) return true;
		if ( (other == null ) ) return false;
		if ( !(other instanceof TProduct) ) return false;
		TProduct castOther = ( TProduct ) other; 
         
		return ( (this.getProductid()==castOther.getProductid()) || ( this.getProductid()!=null && castOther.getProductid()!=null && this.getProductid().equals(castOther.getProductid()) ) )
 && ( (this.getProducttype()==castOther.getProducttype()) || ( this.getProducttype()!=null && castOther.getProducttype()!=null && this.getProducttype().equals(castOther.getProducttype()) ) )
 && ( (this.getName()==castOther.getName()) || ( this.getName()!=null && castOther.getName()!=null && this.getName().equals(castOther.getName()) ) )
 && ( (this.getMxVirtualId()==castOther.getMxVirtualId()) || ( this.getMxVirtualId()!=null && castOther.getMxVirtualId()!=null && this.getMxVirtualId().equals(castOther.getMxVirtualId()) ) );
   }
   
   public int hashCode() {
       int result = 17;
         
		result = 37 * result + ( getProductid() == null ? 0 : this.getProductid().hashCode() );
		result = 37 * result + ( getProducttype() == null ? 0 : this.getProducttype().hashCode() );
		result = 37 * result + ( getName() == null ? 0 : this.getName().hashCode() );
		result = 37 * result + ( getMxVirtualId() == null ? 0 : this.getMxVirtualId().hashCode() );
		return result;
   }   

}
