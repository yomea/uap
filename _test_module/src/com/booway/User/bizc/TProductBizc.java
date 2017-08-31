package com.booway.User.bizc;
import com.sgcc.uap.rest.support.QueryResultObject;
import java.io.Serializable;
import com.sgcc.uap.mdd.runtime.base.BizCDefaultImpl;
import java.util.*;
import com.sgcc.uap.rest.support.RequestCondition;
import com.booway.User.po.TProduct;
import org.hibernate.Hibernate;


public class TProductBizc extends BizCDefaultImpl<TProduct, Serializable> implements ITProductBizc {

	/**************** 标准方法执行前后事件,默认全部返回true *******************/
	@Override
	protected void afterDelete(TProduct tproduct) {
		// 自定义逻辑
	
	}

	@Override
	protected void afterAdd(TProduct tproduct) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeDelete(TProduct tproduct) {
		// 自定义逻辑
		
		return true;
	}

	@Override
	protected boolean beforeAdd(TProduct tproduct) {
		// 自定义逻辑
		return true;
	}

	@Override
	protected void afterUpdate(TProduct tproduct ,Serializable pk) {
		// 自定义逻辑
	}

	@Override
	protected boolean beforeUpdate(TProduct tproduct, Serializable pk) {
		// 自定义逻辑
		return true;
	}
	@Override
	public TProduct get(Serializable id) {

		TProduct tproduct = super.get(id);
		/*
		if (tproduct != null) {
			Hibernate.initialize(tproduct.getProducttype());

		}
		*/
		return tproduct;
	}

	@Override
	public QueryResultObject query(RequestCondition queryCondition) {

		QueryResultObject qo = super.query(queryCondition);
		/*
		List<TProduct> tproducts = qo.getItems();
		if (tproducts != null) {
			for (TProduct tproduct : tproducts) {
				Hibernate.initialize(tproduct.getProducttype());

			}
		}
		*/
		return qo;
	}
	
}
