# server-monitoring in nodejs-grafana

## Goal

Setup monitoring with Prometheus and Grafana on localhost.

## Requirements

Nodejs, Docker. Grafana and some libraries

## Demo architecture

![Architecture  Demo](https://user-images.githubusercontent.com/62415557/165236947-11de6649-30d1-4324-b219-996ac800130c.png)

## Steps

1. Run Nodejs server: `npm install` and `node index.js`. Open http://localhost:9090. Show metrics with http://localhost:3000
2. Update file config prometheus-config.yml and **CHANGE TO YOUR IP**
3. Visit your running Prometheus and run [queries](https://prometheus.io/docs/prometheus/latest/querying/basics/).

   ![Untitled2](https://user-images.githubusercontent.com/62415557/165243406-7a91ceb6-646f-4a7c-87ba-2e9cd1523d0d.PNG)

   **Request Per Minute**

   `sum(rate(http_request_duration_ms_count[1m])) by (service, route, method, code)  * 60`

   **Error rate**

   `sum(increase(http_request_duration_ms_count{code=~"^5..$"}[1m])) /  sum(increase(http_request_duration_ms_count[1m]))`

   **Median Response Time**

   `histogram_quantile(0.5, sum(rate(http_request_duration_ms_bucket[1m])) by (le, service, route, method))`

   **Average Memory Usage**

   `avg(nodejs_external_memory_bytes / 1024 / 1024) by (service)`
4. Install Prometheus [Alertmanager](https://prometheus.io/download/) and update file alertmanager.yml.

   ![Untitled3](https://user-images.githubusercontent.com/62415557/165243532-093e9d13-a696-4979-bb03-7e9d9d253741.PNG)

   Run `./alertmanager --config.file=alertmanager.yml` and open http://localhost:9093.

   Spam requests to test alert: `curl http://localhost:3001/?[1-100]`.
5. Run Grafana by Docker

   `docker run -i -p 3000:3000 grafana/grafana`. Open http://localhost:3000.

   ```
   Username: admin
   Password: admin
   ```

   **Setting datasource**

   Create a Grafana datasource with this settings:

   - name: DS_PROMETHEUS
   - type: prometheus
   - url: http://localhost:9090
   - access: browser

   **Create dashboard**

   - [Import](https://grafana.com/docs/grafana/latest/dashboards/export-import/#import-dashboard) from grafana-dashboard.json.

     ![Untitled](https://user-images.githubusercontent.com/62415557/165243673-7085e397-41da-4cb3-b3e4-730036f17df1.png)

## Reference

[1] Prometheus Docs - https://prometheus.io/docs

[2] Grafana Docs - https://grafana.com/docs/

[3] Prom-client - https://www.npmjs.com/package/prom-client
