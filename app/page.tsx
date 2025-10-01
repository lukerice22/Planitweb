"use client"

export default function PlanitLanding() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Planit — See it. Save it. Plan it.</title>
        <meta
          name="description"
          content="Mark places you've been, plan the ones you'll visit, and bring your travel dreams to life with Planit."
        />

        {/* OpenGraph + Twitter Card meta tags */}
        <meta property="og:title" content="Planit — See it. Save it. Plan it." />
        <meta
          property="og:description"
          content="Mark places you've been, plan the ones you'll visit, and bring your travel dreams to life with Planit."
        />
        <meta property="og:image" content="{{LOGO_PNG}}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Planit — See it. Save it. Plan it." />
        <meta
          name="twitter:description"
          content="Mark places you've been, plan the ones you'll visit, and bring your travel dreams to life with Planit."
        />
        <meta name="twitter:image" content="{{LOGO_PNG}}" />

        <link rel="icon" type="image/png" href="{{LOGO_PNG}}" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: '#2E7AFF',
                            accent: '#00C2A8',
                            dark: '#0F172A',
                            light: '#F8FAFC'
                        }
                    }
                }
            }
          `,
          }}
        />
      </head>
      <body className="bg-light text-dark font-sans antialiased">
        {/* 
        PLACEHOLDER BLOCK FOR EASY SEARCH/REPLACE:
        {{APPSTORE_URL}}
        {{TESTFLIGHT_URL}}
        {{QR_CODE_PNG}}
        {{LOGO_PNG}}
        {{SCREEN_HOME}}
        {{SCREEN_PINS}}
        {{SCREEN_PLAN}}
        {{SCREEN_PHOTOS}}
        {{PRESS1_PNG}}
        {{PRESS2_PNG}}
        {{CONTACT_EMAIL}}
        {{PRIVACY_URL}}
        {{TERMS_URL}}
        {{BETA_FORM_ACTION}}
        */}

        {/* Sticky Navbar */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img
                  src="{{LOGO_PNG}}"
                  alt="Planit"
                  className="h-8 w-8 mr-2"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                    e.currentTarget.nextElementSibling.style.display = "block"
                  }}
                />
                <span className="text-xl font-bold text-primary hidden">Planit</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#pins" className="text-gray-600 hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#onboarding" className="text-gray-600 hover:text-primary transition-colors">
                  Sign Up
                </a>
                <a href="#faq" className="text-gray-600 hover:text-primary transition-colors">
                  FAQ
                </a>
                <a href="{{PRIVACY_URL}}" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy
                </a>
                <button
                  id="nav-get-app"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Get Started
                </button>
              </div>
              <button className="md:hidden p-2" id="mobile-menu-button">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-light to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-4xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
                  See it. Save it.
                  <br />
                  <span className="text-primary">Plan it.</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Mark places you've been, plan the ones you'll visit, and bring your travel dreams to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <button
                    id="hero-get-started"
                    className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Get Started
                  </button>
                  <button
                    className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => document.getElementById("pins")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    See how it works
                  </button>
                </div>
                {/* Feature strip */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-gray-600 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Drop pins anywhere</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Notes & to-dos on each place</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Tags, colors, and categories</span>
                  </div>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="relative mx-auto w-full max-w-sm">
                  <img
                    src="/all-pins.jpeg"
                    alt="Planit map showing all pins across North America with filter tabs for All, Visited, and Wishlist"
                    className="w-full h-auto rounded-3xl shadow-2xl"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Row */}
        <section className="py-8 bg-white border-b border-gray-100 hidden" data-press-row="off">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">Featured in</p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <img
                  src="{{PRESS1_PNG}}"
                  alt="Press Logo 1"
                  className="h-8"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <img
                  src="{{PRESS2_PNG}}"
                  alt="Press Logo 2"
                  className="h-8"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pins & Organization Section */}
        <section id="pins" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">Organize your world</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Customize your map to match your journey</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative mx-auto w-full max-w-xs mb-6">
                  <img
                    src="/customized-pins.jpeg"
                    alt="Planit map showing customized pins with different colors and shapes including flags and location markers"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Customize your map</h3>
                <p className="text-gray-600">Customize pins by color and style to match your journeys.</p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto w-full max-w-xs mb-6">
                  <img
                    src="/wishlist-pins.jpeg"
                    alt="Planit map filtered to show only wishlist pins with the Wishlist tab selected"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Wishlist</h3>
                <p className="text-gray-600">Save the places you dream of visiting.</p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto w-full max-w-xs mb-6">
                  <img
                    src="/visited-pins.jpeg"
                    alt="Planit map filtered to show only visited pins with the Visited tab selected"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Visited</h3>
                <p className="text-gray-600">Celebrate the places you've already explored.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pin Details & Customization Section */}
        <section id="pin-details" className="py-16 lg:py-24 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Row A - Image left, content right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative">
                <img
                  src="/pin-menu.jpeg"
                  alt="Planit pin details screen showing Paris, France with quick actions, visit date, priority settings, and appearance options"
                  className="w-full max-w-sm mx-auto h-auto rounded-2xl shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-dark mb-4">Pin details at a glance</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Open a pin to get directions, set visit dates, and manage priority—all in one place.
                </p>
              </div>
            </div>

            {/* Row B - Content left, image right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-dark mb-4">Make each pin yours</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Choose shapes and colors so your map is easy to scan at a glance.
                </p>
              </div>
              <div className="relative order-1 lg:order-2">
                <img
                  src="/appearance.jpeg"
                  alt="Pin appearance customization showing pin shape options (Default, Flag, Thin) and color palette selection"
                  className="w-full max-w-sm mx-auto h-auto rounded-2xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tags & Categories Section */}
        <section id="tags" className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">Organize by what matters</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From food and culture to adventure and photography—tags make it effortless to find the moments you love.
              </p>
            </div>
            <div className="relative mx-auto max-w-md">
              <img
                src="/categories.jpeg"
                alt="Planit categories screen showing tags like Beach, City, Food, Culture, Adventure, History, Nightlife, Photography, and more with 6 selected"
                className="w-full h-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Notes & To-Do Section */}
        <section id="notes-todo" className="py-16 lg:py-24 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Notes Column */}
              <div className="text-center">
                <div className="relative mx-auto w-full max-w-sm mb-6">
                  <img
                    src="/notes.jpeg"
                    alt="Planit notes screen showing Paris travel thoughts including City of light, walking along the Seine, Montmartre, and dinner reminders"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-3">Keep your thoughts</h3>
                <p className="text-lg text-gray-600">Save ideas, context, and memories right on the place.</p>
              </div>

              {/* To-Do Column */}
              <div className="text-center">
                <div className="relative mx-auto w-full max-w-sm mb-6">
                  <img
                    src="/to-do.jpeg"
                    alt="Planit to-do list showing tasks for Paris including Try a baguette (completed), See the Eiffel Tower, and Notre Dame Cathedral"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-3">Plan your list</h3>
                <p className="text-lg text-gray-600">Turn dreams into checkmarks with simple tasks on each pin.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Add Pin Section */}
        <section id="search-add" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Row A - Search */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative">
                <img
                  src="/searching.jpeg"
                  alt="Planit search interface showing paris query with results including Paris, France and other Paris locations"
                  className="w-full max-w-sm mx-auto h-auto rounded-2xl shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-dark mb-4">Find anywhere fast</h3>
                <p className="text-lg text-gray-600 leading-relaxed">Type a destination and jump right to it.</p>
              </div>
            </div>

            {/* Row B - Add Pin */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h3 className="text-3xl font-bold text-dark mb-4">Drop a pin in one tap</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Add a pin anywhere in the world—Planit does the rest.
                </p>
              </div>
              <div className="relative order-1 lg:order-2">
                <img
                  src="/add-pin.jpeg"
                  alt="Add this pin? confirmation dialog for Paris, France on the map with Cancel and Add Pin buttons"
                  className="w-full max-w-sm mx-auto h-auto rounded-2xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-16 lg:py-24 bg-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">Everything in one place</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pins, trips, photos, calendar, budget tracker, achievements, and more.
              </p>
            </div>
            <div className="relative mx-auto max-w-md">
              <img
                src="/min-menu-top.jpeg"
                alt="Planit pin menu showing Paris, France with quick actions including Get Directions, Not Visited toggle, Visit Date, and Priority settings"
                className="w-full h-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Sign Up & Sign In Section */}
        <section id="onboarding" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">Get started today</h2>
              <p className="text-xl text-gray-600">Your journey begins here</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Sign Up */}
              <div className="text-center">
                <div className="relative mx-auto w-full max-w-sm mb-6">
                  <img
                    src="/signup.jpeg"
                    alt="Planit sign up modal with username, email, password fields, Sign Up button, Continue with Google, and Already have an account? Sign In link"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-3">Create your account</h3>
                <p className="text-lg text-gray-600">Start planning in seconds.</p>
              </div>

              {/* Sign In */}
              <div className="text-center">
                <div className="relative mx-auto w-full max-w-sm mb-6">
                  <img
                    src="/signin.jpeg"
                    alt="Planit sign in modal with email, password fields, Sign In button, Continue with Google, and Don't have an account? Sign Up link"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-3">Pick up where you left off</h3>
                <p className="text-lg text-gray-600">Your pins, notes, and to-dos stay in sync.</p>
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                id="signup-cta"
                className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Sign Up Free
              </button>
              <button
                id="signin-cta"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Your world, pinned.</h2>
                <button
                  id="footer-get-started"
                  className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary mb-4"
                >
                  Get Started
                </button>
                <div>
                  <button
                    className="text-white underline hover:no-underline"
                    onClick={() => document.getElementById("pins")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    See features
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/all-pins.jpeg"
                  alt="Planit map with pins"
                  className="w-full max-w-sm mx-auto lg:ml-auto h-auto rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">Everything you need to plan better</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple tools that make travel planning actually enjoyable
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Pin places instantly</h3>
                <p className="text-gray-600">Save wishlist or visited spots with notes, photos, and status</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Smart add from photos</h3>
                <p className="text-gray-600">Detects locations from images and offers one-tap pinning</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Interactive map</h3>
                <p className="text-gray-600">Explore, search, and manage your pins on a bright, friendly map</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Cross-device sync</h3>
                <p className="text-gray-600">Your pins and trips follow you across devices</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Plan trips your way</h3>
                <p className="text-gray-600">Organize by mood, priority, or tags</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-24 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">How it works</h2>
              <p className="text-xl text-gray-600">Three simple steps to better travel planning</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative mx-auto w-48 h-80 bg-gray-900 rounded-3xl p-2 mb-6">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <img
                      src="/mobile-app-search-places-screen.png"
                      alt="Search places"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Search</h3>
                <p className="text-gray-600">Find places you want to visit or remember</p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto w-48 h-80 bg-gray-900 rounded-3xl p-2 mb-6">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <img
                      src="/mobile-app-pin-locations-screen.png"
                      alt="Pin locations"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Pin</h3>
                <p className="text-gray-600">Save them with notes, photos, and status</p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto w-48 h-80 bg-gray-900 rounded-3xl p-2 mb-6">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <img
                      src="/mobile-app-plan-trips-screen.png"
                      alt="Plan trips"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Plan</h3>
                <p className="text-gray-600">Organize into trips and make it happen</p>
              </div>
            </div>
          </div>
        </section>

        {/* Screens Gallery */}
        <section id="screens" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">See it in action</h2>
              <p className="text-xl text-gray-600">Click any screen to take a closer look</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => openLightbox("/mobile-app-home-screen-with-map.png", "Home & Map View")}
              >
                <div className="relative mx-auto w-full max-w-48 aspect-[9/16] bg-gray-900 rounded-3xl p-2 shadow-lg">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <img
                      src="/mobile-app-home-screen-with-map.png"
                      alt="Home & Map View"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-center mt-4 text-sm font-medium text-gray-700">Home & Map</p>
              </div>
              <div
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => openLightbox("/mobile-app-pins-list-screen.png", "Pins List & Detail")}
              >
                <div className="relative mx-auto w-full max-w-48 aspect-[9/16] bg-gray-900 rounded-3xl p-2 shadow-lg">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <img
                      src="/mobile-app-pins-list-screen.png"
                      alt="Pins List & Detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-center mt-4 text-sm font-medium text-gray-700">Pins & Details</p>
              </div>
              <div
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => openLightbox("/mobile-app-trip-planning-screen.png", "Plan & Add Pin Flow")}
              >
                <div className="relative mx-auto w-full max-w-48 aspect-[9/16] bg-gray-900 rounded-3xl p-2 shadow-lg">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <img
                      src="/mobile-app-trip-planning-screen.png"
                      alt="Plan & Add Pin Flow"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-center mt-4 text-sm font-medium text-gray-700">Planning</p>
              </div>
              <div
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => openLightbox("/mobile-app-photo-journal-screen.png", "Photo Journal")}
              >
                <div className="relative mx-auto w-full max-w-48 aspect-[9/16] bg-gray-900 rounded-3xl p-2 shadow-lg">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <img
                      src="/mobile-app-photo-journal-screen.png"
                      alt="Photo Journal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-center mt-4 text-sm font-medium text-gray-700">Photo Journal</p>
              </div>
            </div>
          </div>
        </section>

        {/* Beta Signup */}
        <section id="beta-signup" className="py-16 lg:py-24 bg-light">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">Join the beta</h2>
            <p className="text-xl text-gray-600 mb-8">
              Be among the first to try Planit and help shape the future of travel planning
            </p>
            <form id="beta-form" className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                id="beta-email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap"
              >
                Join beta
              </button>
            </form>
            <div id="beta-message" className="mt-4 text-sm hidden"></div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">Frequently asked questions</h2>
            </div>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-dark mb-2">When will Planit be available?</h3>
                <p className="text-gray-600">
                  Planit is currently in beta testing. Join our beta program to get early access and help us improve the
                  app before the official launch.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-dark mb-2">Is Planit available for iOS?</h3>
                <p className="text-gray-600">
                  Yes! Planit is built for iOS and will be available on the App Store. We're also working on an Android
                  version for the future.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-dark mb-2">Does my data sync across devices?</h3>
                <p className="text-gray-600">
                  Absolutely. All your pins, trips, and photos sync seamlessly across all your devices so you can plan
                  anywhere and access everything everywhere.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-dark mb-2">How do you handle my privacy?</h3>
                <p className="text-gray-600">
                  Your privacy is our priority. We only collect data necessary to provide the service, never sell your
                  information, and give you full control over your data. Read our full privacy policy for details.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-dark mb-2">Will Planit be free?</h3>
                <p className="text-gray-600">
                  The beta is completely free. We're still finalizing our pricing model, but we're committed to keeping
                  core features accessible to everyone.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-dark mb-2">What's on the roadmap?</h3>
                <p className="text-gray-600">
                  We're working on collaborative trip planning, offline maps, travel recommendations, and integrations
                  with booking platforms. Have ideas? We'd love to hear them!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-400">&copy; 2025 Planit. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <a href="{{PRIVACY_URL}}" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="{{TERMS_URL}}" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms
                </a>
                <a href="mailto:{{CONTACT_EMAIL}}" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Lightbox Modal */}
        <div
          id="lightbox"
          className="fixed inset-0 bg-black bg-opacity-75 z-50 hidden items-center justify-center p-4"
          onClick={() => closeLightbox()}
        >
          <div className="relative max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => closeLightbox()}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 focus:outline-none"
            >
              &times;
            </button>
            <div className="relative w-full aspect-[9/16] bg-gray-900 rounded-3xl p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                <img id="lightbox-image" src="/placeholder.svg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <p id="lightbox-caption" className="text-white text-center mt-4 text-lg"></p>
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
            // App store link management
            function getAppStoreLink() {
                const appStoreUrl = '{{APPSTORE_URL}}';
                const testFlightUrl = '{{TESTFLIGHT_URL}}';
                
                // Return App Store URL if available, otherwise TestFlight
                if (appStoreUrl && !appStoreUrl.includes('{{')) {
                    return appStoreUrl;
                } else if (testFlightUrl && !testFlightUrl.includes('{{')) {
                    return testFlightUrl;
                }
                return '#';
            }

            // Set up app store links
            document.addEventListener('DOMContentLoaded', function() {
                const appLink = getAppStoreLink();
                document.getElementById('nav-get-app').onclick = () => window.open(appLink, '_blank');
                document.getElementById('hero-get-started').onclick = () => window.open(appLink, '_blank');
                document.getElementById('qr-code').onclick = () => window.open(appLink, '_blank');
                document.getElementById('signup-cta').onclick = () => window.open(appLink, '_blank');
                document.getElementById('signin-cta').onclick = () => window.open(appLink, '_blank');
                document.getElementById('footer-get-started').onclick = () => window.open(appLink, '_blank');
            });

            // Screenshot slider
            let currentSlide = 0;
            const slides = document.querySelectorAll('.screenshot-slide');
            let sliderInterval;

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.style.opacity = i === index ? '1' : '0';
                });
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }

            function startSlider() {
                sliderInterval = setInterval(nextSlide, 4000);
            }

            function stopSlider() {
                clearInterval(sliderInterval);
            }

            // Initialize slider
            document.addEventListener('DOMContentLoaded', function() {
                const slider = document.getElementById('screenshot-slider');
                slider.addEventListener('mouseenter', stopSlider);
                slider.addEventListener('mouseleave', startSlider);
                startSlider();
            });

            // Lightbox functionality
            function openLightbox(imageSrc, caption) {
                document.getElementById('lightbox-image').src = imageSrc;
                document.getElementById('lightbox-caption').textContent = caption;
                document.getElementById('lightbox').classList.remove('hidden');
                document.getElementById('lightbox').classList.add('flex');
                document.body.style.overflow = 'hidden';
            }

            function closeLightbox() {
                document.getElementById('lightbox').classList.add('hidden');
                document.getElementById('lightbox').classList.remove('flex');
                document.body.style.overflow = 'auto';
            }

            // Beta form handling
            document.getElementById('beta-form').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const email = document.getElementById('beta-email').value;
                const messageDiv = document.getElementById('beta-message');
                const submitButton = e.target.querySelector('button[type="submit"]');
                
                // Show loading state
                submitButton.textContent = 'Joining...';
                submitButton.disabled = true;
                
                try {
                    const formAction = '{{BETA_FORM_ACTION}}';
                    
                    if (formAction && !formAction.includes('{{')) {
                        const response = await fetch(formAction, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email: email })
                        });
                        
                        if (response.ok) {
                            messageDiv.textContent = 'Thanks! We\\'ll be in touch soon.';
                            messageDiv.className = 'mt-4 text-sm text-accent';
                            document.getElementById('beta-email').value = '';
                        } else {
                            throw new Error('Network response was not ok');
                        }
                    } else {
                        // Fallback for demo purposes
                        messageDiv.textContent = 'Thanks! We\\'ll be in touch soon.';
                        messageDiv.className = 'mt-4 text-sm text-accent';
                        document.getElementById('beta-email').value = '';
                    }
                } catch (error) {
                    messageDiv.textContent = 'Something went wrong. Please try again.';
                    messageDiv.className = 'mt-4 text-sm text-red-600';
                }
                
                messageDiv.classList.remove('hidden');
                submitButton.textContent = 'Join beta';
                submitButton.disabled = false;
            });

            // Mobile menu toggle
            document.getElementById('mobile-menu-button').addEventListener('click', function() {
                // Simple mobile menu implementation
                alert('Mobile menu - implement as needed');
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Toggle press row visibility based on data attribute
            document.addEventListener('DOMContentLoaded', function() {
                const pressRow = document.querySelector('[data-press-row]');
                if (pressRow && pressRow.getAttribute('data-press-row') === 'on') {
                    pressRow.style.display = 'block';
                }
            });
          `,
          }}
        />
      </body>
    </html>
  )
}

// Make openLightbox and closeLightbox available globally
declare global {
  function openLightbox(imageSrc: string, caption: string): void
  function closeLightbox(): void
}
