app.controller("EmployeeDataCtrl", function ($http, $scope) {
    $scope.index = "";
    if (localStorage.getItem('localStorageKey') == null)
    {
        $http.get('img/Employee.json').success(function (data) {
            var info = angular.toJson(data);
            localStorage.setItem('localStorageKey', info);
            $scope.Employee = localStorage.getItem('localStorageKey');
            $scope.Employee = angular.fromJson($scope.Employee);

        });
    }
    else
    {
        $scope.Employee = localStorage.getItem('localStorageKey');
        $scope.Employee = angular.fromJson($scope.Employee);
    }
    $scope.EmployeeDelete = function (index) {


        $scope.Employee.splice(index, (index + 1));
        localStorage.setItem('localStorageKey', JSON.stringify($scope.Employee));
    };
    $scope.EmployeeEditfunc = function (index) {
        
        $scope.editData = true;

        $scope.EmployeeEdit = $scope.Employee[index];
        $scope.index = index;
    }
    $scope.saveData = function ()
    {
        if ($scope.index !== "" && angular.isDefined($scope.index)) {
            $scope.Employee[$scope.index].ID = $scope.EmployeeEdit.ID;
            $scope.Employee[$scope.index].Name = $scope.EmployeeEdit.Name;
            $scope.Employee[$scope.index].Location = $scope.EmployeeEdit.Location;
            $scope.Employee[$scope.index].DOB = $scope.EmployeeEdit.DOB;
            $scope.Employee[$scope.index].DOJ = $scope.EmployeeEdit.DOJ;
            $scope.editData = false;
            localStorage.setItem('localStorageKey', JSON.stringify($scope.Employee));
        }
        else {
            console.log($scope.EmployeeEdit);
            $scope.Employee.push(
                    {ID: $scope.EmployeeEdit.ID,
                        Name: $scope.EmployeeEdit.Name,
                        Location: $scope.EmployeeEdit.Location,
                        DOB: $scope.EmployeeEdit.DOB,
                    DOJ: $scope.EmployeeEdit.DOB}
            );

            $scope.editData = false;
            localStorage.setItem('localStorageKey', JSON.stringify($scope.Employee));
        }

        $scope.index = "";

    }
    $scope.cancelData = function()
    {
        $scope.editData = false;
    }
    
});


