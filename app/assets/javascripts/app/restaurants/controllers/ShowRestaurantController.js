angular
  .module('openTableApp')
  .controller('ShowRestaurantController', ShowRestaurantController);

function ShowRestaurantController(Restaurant, $stateParams, $scope, RestaurantService, uiGmapGoogleMapApi){

  var showRestaurant = this;

  showRestaurant.restaurant = Restaurant.get({ id: $stateParams.id });

  $scope.selectedRestaurant = showRestaurant.restaurant;
  
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  $scope.map.marker;

  showRestaurant.updateScope = function(){
    RestaurantService.selectedRestaurant = $scope.selectedRestaurant;
  }

  $scope.selectedRestaurant.$promise.then(function(data){
    var address = (data.address + " " + data.city);
    
    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({'address': address},function(results, status){
      if (status == google.maps.GeocoderStatus.OK){
        restaurantLat = (results[0].geometry.location.lat());
        restaurantLng = (results[0].geometry.location.lng());

        $scope.map = { center: { latitude: restaurantLat, longitude: restaurantLng}, zoom: 15};
        $scope.map.marker = new google.maps.Marker({
                            idKey: 1,
                            coords: {
                                latitude: restaurantLat,
                                longitude: restaurantLng
                            }
                        });
        $scope.$evalAsync() 
      }else{
        alert(status);
        }   
    });
  });
  
}
