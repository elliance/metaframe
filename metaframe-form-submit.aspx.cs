using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (System.Web.HttpContext.Current.Request.HttpMethod.ToString() == "POST")
        {
            foreach (String s in Request.Form.AllKeys)
            {
                Response.Write(Request.Form[s]);
            
            }
            String rootPath = Server.MapPath("~");
            String path = rootPath + "\\" + Request.Form["csv_filename"];
            String line = "";
            line += "\"" + Request.Form["user"] + "\"";
            line += ",\"" + Request.Form["timestamp"] + "\"";
            line += ",\"" + Request.Form["comment"] + "\"";
            if (!File.Exists(path))
            {
                // Create a file to write to. 
                using (StreamWriter sw = File.CreateText(path))
                {
                    sw.WriteLine(line);
                }
            }
            using (StreamWriter sw = File.AppendText(path))
            {
                sw.WriteLine(line);
            }
        }
    }
}