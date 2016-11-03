/* eslint-disable */
import Rx from 'rxjs/Rx';

app.controller('HomeController', function($scope) {
  $scope.info = {
    data: [
      { name: 'Dave', age: 26 },
      { name: 'Yann', age: 23 },
    ],
    headings: {
      name: 'Name',
      age: 'Age',
    }
  };

  $scope.info.refreshData = Rx.Observable.create(function (subscriber) {
    subscriber.next([
      { name: 'Dave', age: 26 },
      { name: 'Yann', age: 23 },
      { name: 'Vlad', age: 25},
    ]);
    subscriber.complete();
  });
});
