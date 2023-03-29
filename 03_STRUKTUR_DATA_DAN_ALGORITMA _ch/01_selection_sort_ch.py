def find_greatest(lis_):
	gratest_val = lis_[0]
	greatest_index = 0
	for i in range(1, len(lis_)):
		if lis_[i] > gratest_val:
			gratest_val = lis_[i]
			greatest_index = i

	return greatest_index

def find_lowest(lis_):
	gratest_val = lis_[0]
	greatest_index = 0
	for i in range(1, len(lis_)):
		if lis_[i] < gratest_val:
			gratest_val = lis_[i]
			greatest_index = i

	return greatest_index

def selection_sort(list_, type_ = "asc"):
	new_list = []
	for i in range(len(list_)):
		if type_ == "asc": # kecil ke besar
			greatest = find_lowest(list_)
		elif type_ == "desc": # besar ke kecil
			greatest = find_greatest(list_)
		new_list.append(list_.pop(greatest))
		# new_list.append(list_[greatest])

	return new_list

my_numbers = [1,3,5,7,9]
print(selection_sort(my_numbers))
# print(selection_sort(my_numbers, "desc"))

# selection_sort(list, "asc")
 # punya fitur asc dan desc, dan punya default asc