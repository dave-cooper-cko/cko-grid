/* eslint-disable */
import Rx from 'rxjs';

app.controller('HomeController', function($scope, $q, $http) {
  $scope.info = {
    title: 'Transactions',
    headings: {
      id: { name: "ID", sort: true },
      timestamp: { name: "Timestamp", sort: true },
      customerName: { name: "Customer Name", sort: true },
    },
    search: false,
    pagination: true,
  };

  $scope.info.refreshData = function(remoteState) {
    console.log('REMOTESTATE', remoteState);
    let url = 'https://dev.ckofe.com/hub.api/transactions/overview/sales?entityId=100001&entityTypeId=3&fromDate=2016-10-01T00:00:00.000Z&toDate=2016-10-31T23:59:59.999Z';
    if (remoteState.searchText) {
      url += '&search=' + remoteState.searchText;
    }

    if (remoteState.sortColumn && remoteState.sortDirection) {
      url += '&sortColumn=' + remoteState.sortColumn;
      url += '&sortOrder=' + remoteState.sortDirection;
    } else {
      url += '&sortColumn=' + 'timestamp';
      url += '&sortOrder=' + 'desc';
    }

    if (remoteState.resultsPerPage) {
      url += '&pageSize=' + remoteState.resultsPerPage;

      if (remoteState.currentPage) {
        url += '&startIndex=' + (remoteState.resultsPerPage * (remoteState.currentPage - 1));
      } else {
        url += '&startIndex=0';
      }
    }

    const p = $http.get(url, {
      headers: {
        'X-AuthToken': ''
      }
    });

    return Rx.Observable.fromPromise(p)
      .map(response => {
        var data = response.data.datas.map(d => { return { id: d[0], timestamp: d[1], customerName: d[2] }; });
        var rsp = {
          data: data,
          totalRows: response.data.totalRows,
          startIndex: response.data.startIndex
        };

        return rsp;
      });
  }
});
