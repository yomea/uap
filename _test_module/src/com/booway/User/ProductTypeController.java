package com.booway.User;
import com.sgcc.uap.rest.support.DicItems;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import com.sgcc.uap.mdd.runtime.meta.IMetadataService;
import com.sgcc.uap.mdd.runtime.utils.HttpMessageConverter;
import org.osgi.framework.Bundle;
import com.sgcc.uap.service.validator.ServiceValidatorBaseException;
import com.sgcc.uap.utils.ExcelImportUtil;
import com.sgcc.uap.rest.annotation.QueryRequestParam;
import com.sgcc.uap.rest.annotation.attribute.ViewAttributeData;
import com.sgcc.uap.mdd.runtime.validate.IValidateService;
import org.springframework.http.server.ServletServerHttpRequest;
import java.net.URL;
import org.springframework.web.bind.annotation.RequestMethod;
import com.sgcc.uap.rest.annotation.VoidResponseBody;
import javax.annotation.Resource;
import com.sgcc.uap.rest.annotation.ColumnResponseBody;
import com.booway.User.po.ProductType;
import com.booway.User.bizc.IProductTypeBizc;
import java.util.*;
import com.sgcc.uap.rest.annotation.IdRequestBody;
import com.sgcc.uap.bizc.sysbizc.datadictionary.IDataDictionaryBizC;
import org.springframework.web.client.RestClientException;
import com.sgcc.uap.rest.support.RequestCondition;
import com.sgcc.uap.rest.annotation.ItemResponseBody;
import com.sgcc.uap.rest.annotation.ItemsRequestBody;
import com.sgcc.uap.mdd.runtime.base.validator.ValidateResult;
import com.sgcc.uap.rest.support.QueryResultObject;
import com.sgcc.uap.mdd.runtime.utils.BeanUtils;
import com.sgcc.uap.mdd.runtime.utils.BodyReaderRequestWrapper;
import com.sgcc.uap.rest.support.IDRequestObject;
import org.springframework.web.bind.annotation.PathVariable;
import com.sgcc.uap.rest.annotation.ColumnRequestParam;
import org.osgi.framework.FrameworkUtil;


@Controller
@RequestMapping("/productType")
public class ProductTypeController {

	@Resource
	private IProductTypeBizc producttypeBizc;
	
	@Resource
	private IDataDictionaryBizC dataDictionaryBizC;
	
	@Resource
	private IMetadataService metadataService;
	@Resource
	private IValidateService validateService;
	@Resource
	private HttpMessageConverter coverter;
	
	
	/**
	 * 属性过滤，如果这个属性在对应的bean中有对应则会返回，如果没有对应就会被去除
	 * @param filterPropertys
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/meta")
	public @ColumnResponseBody List<ViewAttributeData> getPropertyMeta(@ColumnRequestParam("params") String[] filterPropertys) throws Exception {
	
		List<ViewAttributeData> datas = null;
		datas = metadataService.getPropertyMeta(this.getClass(), "com.booway.User.po.ProductType", filterPropertys);
		return datas;
	}
	
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public @ItemResponseBody List<ProductType> save(HttpServletRequest request_){
		try {
			//获取servlet API
			ServletServerHttpRequest servlet = new BodyReaderRequestWrapper(request_);
	        //将模型转换为java对象
			ProductType[] producttypes = coverter.converter(new ProductType[0], servlet);
		    List<Map<String,Object>> changedProperies = coverter.converter(new ArrayList<Map<String,Object>>(), servlet);
	        List<ProductType> voList = new ArrayList<ProductType>();
	        //对所有属性进行后端校验
			validateService.validateWithException(ProductType.class, changedProperies);
			//遍历表单数据, 如果当前数据在数据库里存在, 则做修改, 否则做新增处理
			for (int i = 0; i < producttypes.length; i++) {
				ProductType producttype= producttypes[i];
				Serializable pkValue = producttype.getTypeid();
				Map<String,Object> changedProperty = coverter.flatHandle(ProductType.class,changedProperies.get(i));
				if (null != pkValue) {
					ProductType old = producttypeBizc.get(pkValue);

	 				BeanUtils.populate(old, changedProperty);
	 				
	                producttypeBizc.update(old, pkValue);
					voList.add(producttype);
	
				}else{
					BeanUtils.populate(producttype, changedProperty);
					producttypeBizc.add(producttype);
					voList.add(producttype);
				}
			}
			return voList;
		}catch (ServiceValidatorBaseException e) {
			throw e;
		}catch (Exception e) {
			throw new RestClientException("保存方法异常", e);
		}
	}
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @VoidResponseBody Object delete(@IdRequestBody IDRequestObject idObject){
		String[] ids = idObject.getIds();
		for (String id : ids) {
			producttypeBizc.delete(java.lang.String.valueOf(id));
		}
		return null;
	}

	@RequestMapping("/{id}")
    public @ItemResponseBody QueryResultObject get(@PathVariable String id) {
		ProductType producttype ;
		if("null".equals(id)){
			producttype = null;
		}else {
			producttype = producttypeBizc.get(java.lang.String.valueOf(id));
		}
		QueryResultObject qObject = new QueryResultObject();
		List items = new ArrayList();
		items.add(producttype);
		qObject.setItems(items);
		
    	return qObject.addDicItems(wrapDictList());
    }

	/**
	 * 枚举，一起封装到QueryResultObject中，明确返回结果中的枚举含义
	 * @return
	 */
	private List<DicItems> wrapDictList() {
		List<DicItems> dicts = new ArrayList<DicItems>();

		DicItems dictProductTypeTypename = new DicItems();
		dictProductTypeTypename.setName("typename");
		
		// /模块名/config/enum/enums.properties
		// Man:0,Woman:1
		// Man\:0,Woman\:1
		// map1.put("key", "Man");
		// map1.put("value", "0");
		// map2.put("key", "Woman");
        // map2.put("value", "1");
		// list.add(map1) list.add(map2)
		//setValues(list);
		dictProductTypeTypename.setValues(dataDictionaryBizC.translateFromFile("Enum_","value","text"));

		dicts.add(dictProductTypeTypename);
		return dicts;
	}

@RequestMapping("/")
    public @ItemResponseBody QueryResultObject query(@QueryRequestParam("params") RequestCondition queryCondition){
	    QueryResultObject queryResult = producttypeBizc.query(queryCondition);

	    return queryResult.addDicItems(wrapDictList());
    }


	
}
