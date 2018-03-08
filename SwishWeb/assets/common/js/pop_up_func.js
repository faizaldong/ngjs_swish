 $('.btn-login').click(function() {
    new $.popup({                
        title : 'Sign In to Swish',
        content : '<div class="row social-login"><div class="col-xs-6"><a href="" class="btn_1 login-fb"><i class="fa fa-facebook" aria-hidden="true"></i> &nbsp; Facebook</a></div><div class="col-xs-6"><a href="" class="btn_1 login-g"><i class="fa fa-google-plus" aria-hidden="true"></i> &nbsp; Google+</a></div></div><div class="gap"></div><div class="row"><div class="col-xs-12"><h5><span>OR</span></h5></div></div><div class="row"><div class="col-xs-12"><input type="email" class="form-control email" placeholder="Email Address"></div><div class="col-xs-12"><input type="password" class="form-control lock" placeholder="Password"></div></div><div class="gap"></div><div class="row"><div class="col-xs-12"><input type="submit" class="btn btn-primary form-control animate" value="SIGN IN"></div><div class="col-xs-12"><button class="btn btn-primary form-control animate btn-greyed">REGISTER</button></div></div><div class="gap"></div><div class="row"><div class="col-sm-12 mini-link"><a href="#">Forgot Password</a></div></div>', 
		html: true,
		autoclose : false,
		closeOverlay:false,
		closeEsc: true,
		buttons: {OK: { text: 'X', style: 'default', addClass : 'popup-close', action: null }}
    });
});

  $('.btn-register').click(function() {
    new $.popup({                
        title : 'Register for Swish',
        content : '<h4>ACCOUNT INFO</h4><div class="row"><div class="col-xs-12"><input type="email" class="form-control email" placeholder="Email Address"></div><div class="col-xs-12"><input type="password" class="form-control lock" placeholder="Password"></div><div class="col-xs-12"><input type="password" class="form-control lock" placeholder="Confirm Password"></div></div><div class="gap-sm"></div><h4>PERSONAL INFO</h4><div class="row"><div class="col-xs-12"><input type="text" class="form-control user" placeholder="Full Name"></div><div class="col-xs-12"><input type="tel" class="form-control phone" placeholder="Phone"></div><div class="col-xs-12"><input type="text" class="form-control calendar" placeholder="Date of Birth"></div><div class="col-xs-12"><input type="text" class="form-control flag" placeholder="Nationality"></div></div><div class="gap"></div><div class="row"><div class="col-xs-12"><input type="submit" class="btn btn-primary form-control animate" value="REGISTER"></div></div><div class="gap-sm"></div><div class="row"><div class="col-sm-12 mini-link"><a href="#">Have an account? Sign in now</a></div></div>', 
		html: true,
		autoclose : false,
		closeOverlay:false,
		closeEsc: true,
		buttons: {OK: { text: 'X', style: 'default', addClass : 'popup-close', action: null }}
    });
});