package com.booway.User.bizc;

import com.sgcc.uap.rest.support.QueryResultObject;
import com.booway.User.po.ProductType;
import java.io.Serializable;
import com.sgcc.uap.mdd.runtime.base.IBizC;
import java.util.*;
import com.sgcc.uap.rest.support.RequestCondition;


public interface IProductTypeBizc extends IBizC<ProductType,Serializable>{

	public ProductType add(ProductType be);
	
	public void delete(Serializable id);
	
	public QueryResultObject query(RequestCondition queryCondition);
	
	public ProductType get(Serializable id);
	
	public void update(ProductType producttype,Serializable pk);
	
	
}
