# User Prompts Log

This file records all user prompts submitted during the development of this SBS Transit NextBus public transport portal and LTA DataMall API integration.

---

### Prompt 1
> **Date / Context**: Initial Application Creation & UI Replication  
> **Image**: Uploaded screenshot of SBS Transit portal with NextBus arrival timings, sidebar navigation, and site outline.
>
> ```text
> Build me an app with screens that look like this. You can hotlink images from the html
> ```

---

### Prompt 2
> **Date / Context**: GitHub Repository Push  
>
> ```text
> git push https://ghp_****@github.com/angliangsheng-hub/mcp-bus.git
> ```
> *(Personal Access Token masked for security)*

---

### Prompt 3
> **Date / Context**: API Gateway & LTA DataMall v3 Integration  
>
> ```text
> 1) create a /api folder under the project main to store all the apis 
> 2) create a /api/health.js to monitor if the apis are working
> 3) integrate the LTA bus information api endpoint GET GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121
> Header:  AccountKey: I+wcQDjORQOo8uJgJEVjFw==
> 
> # BusStopCode is the only required parameter.
> # Add &ServiceNo=7 to ask about one service only.
> # Refreshes every 20 seconds. JSON comes back by default.
> 
> i will add the LTA_ACCOUNT_KEY in vercel environment variables later
> ```

---

### Prompt 4
> **Date / Context**: Documentation of Prompts  
>
> ```text
> create a prompt.md containing all my prompts located at project.main
> ```
