#!/usr/bin/expect
cat ~/.ssh/id_rsa.pub | ssh root@101.132.27.58 "cat - >> ~/.ssh/authorized_keys"

# scp ~/.ssh/id_rsa.pub root@101.132.27.58:/root/
# cat id_rsa.pub >> ~/.ssh/authorized_keys

# set timeout 3
# spawn ssh root@101.132.27.58
# expect {
#   "yes/no" { send "yes\n";exp_continue }
#   "password" { send "******@\n" }
# send "cd ~"  
# interact
# expect eof 