export type RouteLocation =
  | '/karte/'
  | '/karte/Census'
  | '/karte/Census/:table/:field/:id'
  | '/karte/Census/puma/:field/:id'
  | '/karte/Census/tract/:field/:id'
  | '/karte/Explore'
  | '/karte/Explore/:field'
  | '/karte/Explore/:field/:value'
  | '/karte/Explore/Language/:language'
  | '/karte/Explore/Language/:value/:id'
  | '/karte/Explore/Language/none' // reserved, aka "No community selected"
  | '/karte/Explore/Neighborhood'
  | '/karte/Explore/Neighborhood/:id'
  | '/karte/Explore/County'
  | '/karte/Explore/County/:id'
  | '/karte/Info'
  | '/karte/Info/About'
  | '/karte/Info/Feedback'
  | '/karte/Info/Help'
  | '/karte/Data'
  | '/karte/Data/:id'
// TODO: ^^^^ figure out why it's not actually checking

export type LocWithState = {
  pathname: string
  state: { from?: string }
  hash?: string
}
