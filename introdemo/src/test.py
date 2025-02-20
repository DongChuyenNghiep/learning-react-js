# Nhập dãy ký tự vào mảng b1
### Giải thích về .split(' ')
# .split(' '): Tách chuỗi đó thành một danh sách (list), với các phần tử được phân tách bởi dấu cách ' '.
b1 = input("Nhập dãy ký tự các phần tử b1 (1 chiều): ").split(' ')
print(b1) ### Nhập  '1 2 3 4' -> ['1','2','3','4']

# Nhập dãy số nguyên vào mảng a1
a1 = input("Nhập dãy giá trị các phần tử a1 (1 chiều): ").split(' ')
a1 = [int(x) for x in a1]
### Giải thích chỗ viết tắt [int(x) for x in a1]: Nó sẽ được viết đầy đủ là
# c = []
# for x in a1:
#     k = int(x)
#     c.append(k)
# a1 = c (ghi đè a1 cũ)
print(a1)

# Cách dùng hàm isnumeric(). isnumeric() trả về Boolean (True hoặc False)
print("Cách dùng hàm isnumeric()")
print('5'.isnumeric()) # String nó chứa 100% số thì nó sẽ trả là True.
print('s'.isnumeric()) # String này chứa chữ nên trả là False. Luu ý chỉ cần có 1 chữ hay ký tự thì vẫn trả False nhen.

# Nhập dãy vừa chữ vừa số vào mảng b1
def changeValue(v):
    if v.isnumeric(): # Viết gọn cho if v.isnumeric() == True
        return int(v) # Quy đổi từ dạng String qua integer (int)
    else:
        return v

c1 = input("Nhập dãy ký tự các phần tử b1 (1 chiều): ").split(' ') # Anh đã giải thích phía trên.
c1 = [changeValue(x) for x in c1] # Anh đã giải thích phía trên.

# Nhập danh sách học sinh với điểm số
print("Nhập mảng ds2 chứa học sinh [[1, An, 7, 8, 9], [2, Binh, 7, 51]]")
ds2 = []

n = int(input("Nhập số học sinh: "))
for i in range(n): # range(n) thật ra là range từ 0 tới n-1. Nó sẽ chạy liên tục khi nó đạt tới n-1 lần thì sẽ ngưng. 
    hsl = input(f"Nhập thông tin học sinh thứ {i+1}: ").split(' ')# Nhập '1 An 7 8 9' sẽ trả lại [1, An, 7, 8, 9]
    hsl = [changeValue(x) for x in hsl] # Đã giải thích ở phía trên
    ds2.append(hsl) # Cú pháp để thêm phânf từ vào []

print(ds2)

# Cách dùng hàm max
print("Cách dùng hàm max")
print("Tìm giá trị lớn nhất trong mảng a1")
print(max(a1))

# Cách xén mảng
## Cú pháp: list[start:end:step]. Trong đó:
## start: Vị trí bắt đầu (mặc định là 0 nếu không ghi. Cách ghi nếu không viết số 0 là [:x:y]).
## end: Vị trí kết thúc (không bao gồm phần tử ở vị trí này). Nếu không ghi thì vị trí end sẽ là -1.Cách ghi nếu bỏ end [x::y]
## step: Bước nhảy (mặc định là 1 nếu không ghi. Cách ghi: [x:y] ),tức là lấy từng phần tử liên tiếp. Step nhỏ hơn 0 thì index chạy ngược lại
## Ví dụ cho a1 = [1,2,6,7,2,4]
## Trường hợp 1: Lấy 1 phần danh sách
## a3 = a1[:] hoặc a3 = a1 -> a3 = [1, 2, 6, 7, 2, 4]
## a3 = a1[2] -> a3 = 6
## a3 = a1[:4] -> a3 = [1,2,6,7]
## a3 = a1[3:] -> a3 = [7,2,4]
## a3 = a1[1:4] -> a3 = [2,6,7]

## Trường hợp 2: Bỏ qua phần tử với step > 0
## a3 = a1[::2] -> a3 = [1,6,2]
## a3 = a1[1:4:2] -> a3 = [2,7] (nhảy qua thằng 6)

## Trường hợp 3: Step < 0. Lấy từ cuối lên
## a3 = a1[::-1] -> a1 = [4,2,7,6,2,1]
## a3 = a1[::-2] -> a3 = [4,7,2]

print("Cách xén mảng a1 lấy từ phần tử đầu đến phần tử thứ 2")
print(a1[0:2])


# Tìm điểm cao nhất của mỗi học sinh trong ds2
## Giả sử ds2 ở trên cho ra [[1, An, 7, 8, 9], [2, Binh, 7, 51]]
print("Tìm điểm cao nhất của mỗi học sinh trong ds2")
for hs in ds2: 
## để đơn giản với ds2, em cứ cho nó là [a,b] với a = [1, An, 7, 8, 9] và b = [2, Binh, 7, 51]
## Với mỗi phần tử trong ds2 nó sẽ chạy hàm dưới (chạy cả a và b theo cách giải thích của anh)
    print(max(hs[2:]))  # Lấy điểm từ vị trí 2 trở đi
    ## nó chạy print(max(a[2:])) và (max(b[2:])) theo cách giải thích của anh
    ## Có thể hiểu là có bao nhiêu phần tử trong ds2 thì nó sẽ chạy bấy nhiêu lần cái print. Như ở đây sẽ là 2
    ## Nó chạy xong thì trả ra 2 DÒNG lần lượt là 9 và 51

## Lưu ý. hàm nào có dấu : ở cuối nhớ xuống dòng thụt vào 1 tab nhé

