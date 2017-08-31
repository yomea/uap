package com.booway.entity;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.booway.entity.bizc.IUapProjectBizc;
import com.booway.entity.po.UapProject;
import com.sgcc.uap.mdd.runtime.utils.BeanUtils;
import com.sgcc.uap.mdd.runtime.utils.BodyReaderRequestWrapper;
import com.sgcc.uap.mdd.runtime.utils.HttpMessageConverter;
import com.sgcc.uap.rest.annotation.IdRequestBody;
import com.sgcc.uap.rest.annotation.ItemResponseBody;
import com.sgcc.uap.rest.annotation.QueryRequestParam;
import com.sgcc.uap.rest.annotation.TreeResponseBody;
import com.sgcc.uap.rest.annotation.VoidResponseBody;
import com.sgcc.uap.rest.support.IDRequestObject;
import com.sgcc.uap.rest.support.QueryResultObject;
import com.sgcc.uap.rest.support.RequestCondition;
import com.sgcc.uap.rest.support.TreeNode;

@Controller
@RequestMapping("/uapProject")
public class UapProjectController
{

    @Resource
    private IUapProjectBizc uapprojectBizc;
    @Autowired
    private UapModuleController umc;
    
    @Resource 
    private HttpMessageConverter converter;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public @ItemResponseBody
    List<UapProject> save(HttpServletRequest request)
    {
        /*Map<String, String> map = list.get(0);
        String id = map.get("id");
        String name = map.get("name");
        UapProject up = new UapProject();
        up.setId(id);
        up.setName(name);
        if(id == null)
        {
            uapprojectBizc.add(up);
        } else 
        {
            uapprojectBizc.update(up, id);
        }
        List<UapProject> ups = new ArrayList<UapProject>();
        ups.add(up);
        return ups;*/
        List<UapProject> ups = new ArrayList<UapProject>();
        try
        {
            ServletServerHttpRequest servlet = new BodyReaderRequestWrapper(request);
            UapProject[] uapProjects = converter.converter(new UapProject[0], servlet);
            List<Map<String, Object>> properties = converter.converter(new ArrayList<Map<String, Object>>(), servlet);
            for (int i = 0; i < uapProjects.length; i++)
            {
                UapProject uapProject = uapProjects[i];
                Serializable id = uapProject.getId();
                Map<String, Object> changeProperties = properties.get(i);
                if(id != null)
                {
                    UapProject old = uapprojectBizc.get(id);
                    BeanUtils.populate(old, changeProperties);
                    uapprojectBizc.update(old, id);
                } else {
                    BeanUtils.populate(uapProject, changeProperties);
                    uapprojectBizc.add(uapProject);
                }
                ups.add(uapProject);
            }
        } catch (IOException e)
        {
            e.printStackTrace();
        }
        return ups;
        
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @VoidResponseBody
    Object delete(@IdRequestBody IDRequestObject idObject)
    {
        String[] ids = idObject.getIds();
        for (String id : ids)
        {
            uapprojectBizc.delete(java.lang.String.valueOf(id));
        }
        return null;
    }

    @RequestMapping("/{id}")
    public @ItemResponseBody
    QueryResultObject get(@PathVariable String id)
    {
        UapProject uapproject;
        if ("null".equals(id))
        {
            uapproject = null;
        } else
        {
            uapproject = uapprojectBizc.get(java.lang.String.valueOf(id));
        }
        QueryResultObject qObject = new QueryResultObject();
        List<UapProject> items = new ArrayList<UapProject>();
        items.add(uapproject);
        qObject.setItems(items);

        return qObject;
    }

    @RequestMapping("/")
    public @ItemResponseBody
    QueryResultObject query(@QueryRequestParam("params") RequestCondition queryCondition)
    {
        QueryResultObject queryResult = uapprojectBizc.query(queryCondition);

        return queryResult;
    }
    
    @TreeResponseBody
    @RequestMapping("/tree")
    public List<TreeNode> listRootTreeNode()
    {
        return uapprojectBizc.listRootTree();
    }
    
    @RequestMapping("/tree/{id}")
    @TreeResponseBody
    public List<TreeNode> listChildTreeNode(@PathVariable String id)
    {
        return umc.listChildTree(id);
    }
}
