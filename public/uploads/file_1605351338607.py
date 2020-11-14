# Question 1: Given a two integer numbers return their product and  if the product is greater than 1000, then return their sum
a = int(input("Enter 1st Number : "))
b = int(input("Enter 2st Number : "))

if (a*b) > 1000 :
    print("Sum : ",a+b)

else:
    print("Multiplication : ",a*b)
