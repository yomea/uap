package com.booway.User.bizc;
import com.sgcc.uap.rest.support.QueryResultObject;
import com.booway.User.po.ProductType;
import java.io.Serializable;
import com.sgcc.uap.mdd.runtime.base.BizCDefaultImpl;
import java.util.*;
import com.sgcc.uap.rest.support.RequestCondition;


public class ProductTypeBizc extends BizCDefaultImpl<ProductType, Serializable> implements IProductTypeBizc {

	/**************** 标准方法执行前后事件,默认全部返回true *******************/
	@Override
	protected void afterDelete(ProductType producttype) {
		// 自定义逻辑
	
	}

	@Override
	protected void afterAdd(ProductType producttype) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeDelete(ProductType producttype) {
		// 自定义逻辑
		
		return true;
	}

	@Override
	protected boolean beforeAdd(ProductType producttype) {
		// 自定义逻辑
		return true;
	}

	@Override
	protected void afterUpdate(ProductType producttype ,Serializable pk) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeUpdate(ProductType producttype, Serializable pk) {
		// 自定义逻辑
		return true;
	}
	
}
