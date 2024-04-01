from itertools import combinations,permutations

class Vehicle:
    def __init__(self, reg_no, vehicle_type, truck_capacity, curr_weight, fuel_cost_unloaded, fuel_cost_loaded):
        self.reg_no = reg_no
        self.vehicle_type = vehicle_type
        self.truck_capacity = truck_capacity
        self.curr_weight = curr_weight
        self.fuel_cost_unloaded = fuel_cost_unloaded
        self.fuel_cost_loaded = fuel_cost_loaded

def calculate_fleet_cost(fleet,target):
    total_cost = 0
    rem=target
    for vehicle in fleet:
        percentage_fulfilled = min(1, rem / vehicle.truck_capacity)
        cost = 2*vehicle.fuel_cost_unloaded + percentage_fulfilled * (vehicle.fuel_cost_loaded - vehicle.fuel_cost_unloaded)
        rem=max(0,rem-vehicle.truck_capacity)
        total_cost += cost
        if rem==0:
            break
    return total_cost

def generate_all_subsets(vehicles):
    all_subsets = []
    for r in range(1, len(vehicles) + 1):
        for subset in combinations(vehicles, r):
             all_subsets.append(subset)
            #  all_subsets.extend(permutations(subset)) # to consider all permutations
    return all_subsets

def prepare_final_fleet(vehicles, target_weight):
    #Consider all subsets  of all vehicles
    #for each subset find the cost
    vehicles.sort(key=lambda x: x.truck_capacity)
    all_subsets = generate_all_subsets(vehicles)
    min_cost = float('inf')
    min_size = float('inf')
    min_cost_fleet = []
    entire_capacity=sum(vehicle.truck_capacity for vehicle in vehicles)
    if entire_capacity<=target_weight:
        min_cost_fleet=vehicles
        return min_cost_fleet
  
        
    for subset in all_subsets:
        total_capacity = sum(vehicle.truck_capacity for vehicle in subset)
        if total_capacity >= target_weight:
            cost = calculate_fleet_cost(subset,target_weight)
            if cost < min_cost:
                min_cost = cost
                min_size = len(subset)
                min_cost_fleet = subset
            elif cost == min_cost:
                if len(subset) < min_size:
                    min_size = len(subset)
                    min_cost_fleet = subset

    return min_cost_fleet

# # Example usage:
# vehicles = [
#     Vehicle("ABC123", "Truck", 5000, 0, 50, 60),
#     Vehicle("DEF456", "Van", 3000, 0, 40, 50),
#     Vehicle("GHI789", "Truck", 6000, 0, 60, 70),
#     Vehicle("JKL012", "Van", 4000, 0, 45, 55),
# ]
# modified_vehicles=vehicles*3
# # print(modified_vehicles)
# vehicles=modified_vehicles

# target_weight = 24000 #sts current value->input by sts manager
# sts_total_capacity=15000 #sts_total_capacity->input by sts manager
# final_fleet = prepare_final_fleet(vehicles, target_weight)


# total_cost = 0
# rem=target_weight

# for vehicle in final_fleet:
#     percentage_fulfilled = min(1, rem / vehicle.truck_capacity)
#     cost = 2*vehicle.fuel_cost_unloaded + percentage_fulfilled * (vehicle.fuel_cost_loaded - vehicle.fuel_cost_unloaded)
#     rem=max(0,rem-vehicle.truck_capacity)
#     total_cost += cost
#     vehicle.curr_weight=percentage_fulfilled*vehicle.truck_capacity

# print("Final Fleet:")
# for vehicle in final_fleet:
#     print(vehicle.curr_weight)

    
# print("remaining sts_weight: {}".format(rem))
# print("sts_total_capacity: {}".format(sts_total_capacity))
# print("total_cost: {}".format(total_cost))


