# INSTALL

```
git clone git@gitlab.com:lethkhai/smart-home-be.git
cd .\smart-home-be\
```

# Install all the package in the requitement.txt file
```
npm install
```

# Run
## Start the server
```
npm run start
```
## To publish data
Run the pub.py in order to publish fake data to mqtt broker. Make sure you have installed **"paho-mqtt"** package
```
python pub.py
```
