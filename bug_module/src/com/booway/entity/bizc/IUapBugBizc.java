package com.booway.entity.bizc;

import java.io.Serializable;

import com.booway.entity.po.UapBug;
import com.sgcc.uap.mdd.runtime.base.IBizC;
import com.sgcc.uap.rest.support.QueryResultObject;
import com.sgcc.uap.rest.support.RequestCondition;


public interface IUapBugBizc extends IBizC<UapBug,Serializable>{

	public UapBug add(UapBug be);
	
	public void delete(Serializable id);
	
	public QueryResultObject query(RequestCondition queryCondition);
	
	public UapBug get(Serializable id);
	
	public void update(UapBug uapbug,Serializable pk);
	
	
}
