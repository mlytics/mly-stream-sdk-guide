We offer two methods to disable P2P mode, one is on dashboard, and the other is on client side.

Here is an example showing how you could disable P2P on client side with JavaScript.

```javascript
const driver = mlysdk.driver.initialize({
  system: {
    isP2PAllowed: false
  }
});
```
