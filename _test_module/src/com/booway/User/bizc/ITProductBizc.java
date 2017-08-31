package com.booway.User.bizc;

import com.sgcc.uap.rest.support.QueryResultObject;
import java.io.Serializable;
import com.sgcc.uap.mdd.runtime.base.IBizC;
import java.util.*;
import com.sgcc.uap.rest.support.RequestCondition;
import com.booway.User.po.TProduct;


public interface ITProductBizc extends IBizC<TProduct,Serializable>{

	public TProduct add(TProduct be);
	
	public void delete(Serializable id);
	
	public QueryResultObject query(RequestCondition queryCondition);
	
	public TProduct get(Serializable id);
	
	public void update(TProduct tproduct,Serializable pk);
	
	
}
